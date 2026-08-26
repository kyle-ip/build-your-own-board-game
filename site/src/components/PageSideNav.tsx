import { useEffect, useState } from 'react'
import { List } from '@phosphor-icons/react'

export type SideNavItem = {
  id: string
  label: string
  short: string
}

type Props = {
  items: SideNavItem[]
  activeId: string
  ariaLabel: string
  title: string
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Narrow number rail; hover expands labels. No active-section tinting. */
export function PageSideNav({ items, activeId, ariaLabel, title }: Props) {
  return (
    <aside
      aria-label={ariaLabel}
      className="group/nav fixed top-24 left-2 z-30 hidden xl:block 2xl:left-4"
    >
      <nav className="max-h-[calc(100dvh-8rem)] w-10 overflow-y-auto rounded-2xl border border-ink/10 bg-foam/95 py-2 group-hover/nav:w-48 group-focus-within/nav:w-48">
        <div className="mb-1 flex h-7 items-center justify-center group-hover/nav:justify-start group-hover/nav:gap-2 group-hover/nav:px-2.5 group-focus-within/nav:justify-start group-focus-within/nav:gap-2 group-focus-within/nav:px-2.5">
          <List size={14} weight="bold" className="shrink-0 text-ink/50" />
          <span className="hidden truncate text-[0.65rem] font-medium tracking-wide text-ink/40 uppercase group-hover/nav:inline group-focus-within/nav:inline">
            {title}
          </span>
        </div>
        <ul className="px-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                title={item.label}
                aria-current={activeId === item.id ? 'location' : undefined}
                onClick={() => scrollToId(item.id)}
                className="flex w-full items-center gap-2 rounded-lg px-1 py-1 text-left text-ink-soft hover:text-ink"
              >
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center font-display text-[0.75rem] text-ink">
                  {item.short}
                </span>
                <span className="hidden min-w-0 flex-1 truncate text-xs group-hover/nav:block group-focus-within/nav:block">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export function useSectionSpy(ids: string[], enabled = true) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    if (!enabled || ids.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]?.target.id
        if (top) setActiveId(top)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0.1, 0.35, 0.6] },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [enabled, ids.join('|')])

  return activeId
}
