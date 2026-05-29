import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

/**
 * Accordion list of FAQ items.
 * @param {{ items: { q: string, a: string }[] }} props
 */
export default function FaqAccordion({ items = [] }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-gray-50"
            >
              <span className="text-sm font-semibold text-[#111111]">{item.q}</span>
              <ChevronDown
                className={clsx(
                  'h-5 w-5 shrink-0 text-[#565959] transition-transform',
                  isOpen && 'rotate-180',
                )}
              />
            </button>
            {isOpen && (
              <div className="animate-fade-in px-4 pb-4 text-sm leading-relaxed text-[#565959]">
                {item.a}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
