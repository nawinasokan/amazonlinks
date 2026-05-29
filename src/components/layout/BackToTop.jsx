import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import clsx from 'clsx'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={clsx(
        'fixed right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-amazon-dark text-white shadow-card-hover transition hover:bg-amazon-blue',
        // sit above the mobile bottom nav on small screens
        'bottom-20 sm:bottom-6',
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
