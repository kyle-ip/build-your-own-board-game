import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section'
  /** Leave room for the fixed left section rail on xl+ screens. */
  withSideNav?: boolean
}

/** Centered main column; wide enough for headings to stay on one line when possible. */
export function PageShell({
  children,
  className = '',
  as: Tag = 'div',
  withSideNav = false,
}: Props) {
  return (
    <Tag
      className={[
        'mx-auto w-full px-4 sm:px-6',
        'max-w-6xl lg:max-w-[min(92vw,80rem)]',
        withSideNav ? 'xl:pl-16 2xl:pl-20' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')
        .trim()}
    >
      {children}
    </Tag>
  )
}
