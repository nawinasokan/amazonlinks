import { Link } from 'react-router-dom'
import { PackageSearch } from 'lucide-react'

/**
 * "No results" state with a CTA.
 * @param {{ title?: string, message?: string, ctaTo?: string, ctaLabel?: string, icon?: React.ComponentType }} props
 */
export default function EmptyState({
  title = 'No results found',
  message = 'We couldn’t find anything matching your filters. Try broadening your search.',
  ctaTo = '/deals',
  ctaLabel = 'Browse all deals',
  icon: Icon = PackageSearch,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amazon-orange/10">
        <Icon className="h-8 w-8 text-amazon-orange" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-[#111111]">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-[#565959]">{message}</p>
      {ctaTo && (
        <Link
          to={ctaTo}
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-amazon-orange px-5 py-2.5 text-sm font-bold text-amazon-dark transition hover:brightness-95"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  )
}
