import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section'
}

/** Centered main column: full width on mobile, ~3/4 viewport on large screens. */
export function PageShell({ children, className = '', as: Tag = 'div' }: Props) {
  return (
    <Tag
      className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:w-[min(100%-3rem,75vw)] lg:max-w-none ${className}`.trim()}
    >
      {children}
    </Tag>
  )
}
