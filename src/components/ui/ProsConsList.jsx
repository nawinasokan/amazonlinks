import { Check, X } from 'lucide-react'
import clsx from 'clsx'

/**
 * Side-by-side pros / cons list (stacks on mobile).
 * @param {{ pros?: string[], cons?: string[], className?: string }} props
 */
export default function ProsConsList({ pros = [], cons = [], className }) {
  return (
    <div className={clsx('grid gap-4 sm:grid-cols-2', className)}>
      <div className="rounded-xl border border-green-200 bg-green-50/60 p-4">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-price-savings">
          <Check className="h-4 w-4" /> Pros
        </h4>
        <ul className="space-y-2">
          {pros.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#111111]">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-price-savings" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-red-200 bg-red-50/60 p-4">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-price-sale">
          <X className="h-4 w-4" /> Cons
        </h4>
        <ul className="space-y-2">
          {cons.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#111111]">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-price-sale" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
