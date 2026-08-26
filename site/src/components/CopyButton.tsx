import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react'
import { useTranslation } from 'react-i18next'
import { CopySimple, Check } from '@phosphor-icons/react'
import { copyText } from '../lib/storage'
import { Button } from './Button'

export function useCopyFeedback() {
  const [copied, setCopied] = useState(false)
  const hideTimer = useRef(0)

  useEffect(() => {
    return () => window.clearTimeout(hideTimer.current)
  }, [])

  const copy = useCallback(async (text: string, event: MouseEvent<HTMLButtonElement>) => {
    // Native <details> still handles this click after the listener returns.
    // Swapping descendants in that window makes Chrome throw insertBefore.
    event.preventDefault()
    event.stopPropagation()
    try {
      await copyText(text)
    } catch {
      return
    }
    setCopied(true)
    window.clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => setCopied(false), 1600)
  }, [])

  return { copied, copy }
}

export function CopyStatus({ copied }: { copied: boolean }) {
  const { t } = useTranslation('common')
  return (
    <span className="pointer-events-none inline-flex items-center gap-2" aria-live="polite">
      <span className={copied ? 'hidden' : 'inline-flex items-center gap-2'} aria-hidden={copied}>
        <CopySimple size={16} />
        {t('cta.copy')}
      </span>
      <span className={copied ? 'inline-flex items-center gap-2' : 'hidden'} aria-hidden={!copied}>
        <Check size={16} weight="bold" />
        {t('cta.copied')}
      </span>
    </span>
  )
}

export function CopyButton({ text, className = '' }: { text: string; className?: string }) {
  const { copied, copy } = useCopyFeedback()

  return (
    <Button
      variant="ghost"
      onClick={(event) => void copy(text, event)}
      onPointerDown={(event) => event.stopPropagation()}
      className={`!px-3 !py-1.5 ${className}`}
    >
      <CopyStatus copied={copied} />
    </Button>
  )
}
