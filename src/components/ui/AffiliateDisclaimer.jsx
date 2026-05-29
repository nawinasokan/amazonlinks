import { useState } from 'react'
import { Info, X } from 'lucide-react'
import clsx from 'clsx'

const DISCLAIMER_TEXT =
  'AmazonLinks is a participant in the Amazon Associates Programme. We earn from qualifying purchases at no extra cost to you.'

const STORAGE_KEY = 'amazonlinks_disclaimer_dismissed'

/**
 * Affiliate disclosure banner.
 * @param {{ dismissible?: boolean, className?: string }} props
 *  - dismissible: shows a close button and remembers dismissal (homepage use)
 */
export default function AffiliateDisclaimer({ dismissible = false, className }) {
  const [dismissed, setDismissed] = useState(() => {
    if (!dismissible) return false
    try {
      return localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      return false
    }
  })

  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className={clsx(
        'flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-[#565959]',
        className,
      )}
      role="note"
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-amazon-orange" />
      <p className="flex-1 leading-relaxed">
        <span className="font-semibold text-[#111111]">Affiliate Disclosure: </span>
        {DISCLAIMER_TEXT}
      </p>
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss disclosure"
          className="shrink-0 rounded p-0.5 text-[#565959] transition hover:bg-amber-100 hover:text-[#111111]"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export { DISCLAIMER_TEXT }
