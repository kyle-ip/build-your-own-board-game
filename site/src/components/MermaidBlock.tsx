import { useCallback, useEffect, useId, useRef, useState, type PointerEvent } from 'react'
import {
  ArrowCounterClockwise,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
} from '@phosphor-icons/react'
import type MermaidApi from 'mermaid'
import { getDiagram } from '../walkthrough/diagrams'

type Props = {
  diagramId: string
  className?: string
}

type Mermaid = typeof MermaidApi
type Point = { x: number; y: number }

let mermaidPromise: Promise<Mermaid> | null = null
let renderSeq = 0

const MAX_HEIGHT = 280
const MIN_HEIGHT = 120
const WIDE_ASPECT = 2.1
const ZOOM_MIN = 0.5
const ZOOM_MAX = 2.5
const ZOOM_STEP = 0.25
const VIEWPORT_MAX_H = 320

function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then((mod) => {
      const mermaid = mod.default
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: 'base',
        flowchart: {
          htmlLabels: true,
          curve: 'basis',
          nodeSpacing: 28,
          rankSpacing: 36,
          padding: 10,
          useMaxWidth: false,
        },
        sequence: {
          useMaxWidth: false,
          actorFontSize: 13,
          messageFontSize: 12,
          noteFontSize: 12,
          boxMargin: 6,
          messageMargin: 28,
        },
        state: {
          useMaxWidth: false,
        },
        themeVariables: {
          fontSize: '13px',
          primaryColor: '#fff8ef',
          primaryTextColor: '#0f2430',
          primaryBorderColor: '#1e4a5f',
          lineColor: '#1e4a5f',
          secondaryColor: '#f0f7fb',
          tertiaryColor: '#fdf0f3',
          background: '#f3ebe0',
          mainBkg: '#fff8ef',
          nodeBorder: '#2a9d8f',
          clusterBkg: '#f3ebe0',
          titleColor: '#0f2430',
          edgeLabelBackground: '#fff8ef',
          fontFamily: 'Outfit, ui-sans-serif, system-ui, sans-serif',
        },
      })
      return mermaid
    })
  }
  return mermaidPromise
}

function computeFitSize(svg: SVGSVGElement, containerWidth: number) {
  const vb = svg.viewBox.baseVal
  const vbW = vb?.width || Number(svg.getAttribute('width')) || 0
  const vbH = vb?.height || Number(svg.getAttribute('height')) || 0
  if (!vbW || !vbH) return null

  const maxWidth = Math.max(containerWidth - 4, 260)
  let width = vbW
  let height = vbH

  if (height > MAX_HEIGHT) {
    const s = MAX_HEIGHT / height
    width *= s
    height = MAX_HEIGHT
  }

  if (width > maxWidth) {
    const s = maxWidth / width
    const shrunkH = height * s
    if (vbW / vbH >= WIDE_ASPECT && shrunkH < MIN_HEIGHT) {
      const grow = MIN_HEIGHT / height
      width *= grow
      height = MIN_HEIGHT
    } else {
      width = maxWidth
      height = shrunkH
    }
  }

  if (height < MIN_HEIGHT && width < maxWidth * 0.9) {
    const s = Math.min(MIN_HEIGHT / height, (maxWidth * 0.9) / width, 1.2)
    width *= s
    height *= s
  }

  return { w: Math.round(width), h: Math.round(height) }
}

function applyBaseSize(svg: SVGSVGElement, size: { w: number; h: number }) {
  svg.removeAttribute('width')
  svg.removeAttribute('height')
  svg.style.width = `${size.w}px`
  svg.style.height = `${size.h}px`
  svg.style.maxWidth = 'none'
  svg.style.display = 'block'
}

export function MermaidBlock({ diagramId, className = '' }: Props) {
  const raw = getDiagram(diagramId)
  const hostRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const baseSizeRef = useRef<{ w: number; h: number } | null>(null)
  const reactId = useId().replace(/:/g, '')
  const [error, setError] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)

  const dragRef = useRef<{
    active: boolean
    startX: number
    startY: number
    originX: number
    originY: number
    pointerId: number
  } | null>(null)

  const refit = useCallback(() => {
    const svgEl = hostRef.current?.querySelector('svg')
    const shell = shellRef.current
    if (!svgEl || !shell) return
    const size = computeFitSize(svgEl, shell.clientWidth)
    if (!size) return
    baseSizeRef.current = size
    applyBaseSize(svgEl, size)
  }, [])

  useEffect(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
    baseSizeRef.current = null
  }, [diagramId])

  useEffect(() => {
    if (!raw || !hostRef.current) return

    let cancelled = false
    const host = hostRef.current
    host.innerHTML = ''

    async function render() {
      try {
        const mermaid = await loadMermaid()
        if (cancelled || !hostRef.current) return

        renderSeq += 1
        const id = `mmd-${reactId}-${renderSeq}-${diagramId.replace(/\./g, '-')}`
        document.getElementById(id)?.remove()

        const { svg } = await mermaid.render(id, raw!)
        if (cancelled || !hostRef.current) return
        hostRef.current.innerHTML = svg
        refit()
        setError(null)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Diagram failed to render')
      }
    }

    void render()
    return () => {
      cancelled = true
    }
  }, [diagramId, raw, reactId, refit])

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return
    const ro = new ResizeObserver(() => {
      refit()
    })
    ro.observe(shell)
    return () => ro.disconnect()
  }, [diagramId, refit])

  function bumpZoom(delta: number) {
    setZoom((z) => {
      const next = Math.round((z + delta) / ZOOM_STEP) * ZOOM_STEP
      return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Number(next.toFixed(2))))
    })
  }

  function resetView() {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return
    const target = event.target as HTMLElement
    if (target.closest('button')) return

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      originX: pan.x,
      originY: pan.y,
      pointerId: event.pointerId,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag?.active) return
    setPan({
      x: drag.originX + (event.clientX - drag.startX),
      y: drag.originY + (event.clientY - drag.startY),
    })
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag?.active) return
    dragRef.current = null
    if (event.currentTarget.hasPointerCapture(drag.pointerId)) {
      event.currentTarget.releasePointerCapture(drag.pointerId)
    }
    setDragging(false)
  }

  if (!raw) {
    return (
      <p className="rounded-xl border border-ink/10 bg-paper px-4 py-3 text-sm text-ink-soft">
        Missing diagram: {diagramId}
      </p>
    )
  }

  const zoomLabel = `${Math.round(zoom * 100)}%`
  const canPan = zoom !== 1 || pan.x !== 0 || pan.y !== 0

  return (
    <div
      ref={shellRef}
      className={`rounded-[var(--radius-card)] border border-ink/10 bg-paper/90 ${className}`}
    >
      <div className="flex items-center justify-between gap-2 border-b border-ink/5 px-2 py-1.5">
        <p className="px-1 text-[0.65rem] text-ink/40">
          {canPan ? 'Drag to pan' : 'Zoom, then drag to pan'}
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Zoom out"
            disabled={zoom <= ZOOM_MIN}
            onClick={() => bumpZoom(-ZOOM_STEP)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-ink-soft transition hover:bg-ink/5 hover:text-ink disabled:opacity-30"
          >
            <MagnifyingGlassMinus size={16} weight="bold" />
          </button>
          <span className="min-w-12 text-center font-mono text-xs tabular-nums text-ink-soft">
            {zoomLabel}
          </span>
          <button
            type="button"
            aria-label="Zoom in"
            disabled={zoom >= ZOOM_MAX}
            onClick={() => bumpZoom(ZOOM_STEP)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-ink-soft transition hover:bg-ink/5 hover:text-ink disabled:opacity-30"
          >
            <MagnifyingGlassPlus size={16} weight="bold" />
          </button>
          <button
            type="button"
            aria-label="Reset zoom and pan"
            disabled={zoom === 1 && pan.x === 0 && pan.y === 0}
            onClick={resetView}
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-ink-soft transition hover:bg-ink/5 hover:text-ink disabled:opacity-30"
          >
            <ArrowCounterClockwise size={15} weight="bold" />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={[
          'relative overflow-hidden select-none',
          dragging ? 'cursor-grabbing' : 'cursor-grab',
        ].join(' ')}
        style={{ height: VIEWPORT_MAX_H }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {error ? (
          <p className="p-4 text-sm text-coral">{error}</p>
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
          >
            <div ref={hostRef} className="pointer-events-none" />
          </div>
        )}
      </div>
    </div>
  )
}
