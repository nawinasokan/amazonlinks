import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to the top of the page on route (pathname) change. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Let in-page anchor links (#section) scroll naturally.
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
