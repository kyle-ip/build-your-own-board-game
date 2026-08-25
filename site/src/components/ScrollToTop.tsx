import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Jump to top on route change (no smooth scroll, no scroll restoration). */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
