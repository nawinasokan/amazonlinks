import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'

/**
 * Reusable section header with optional "view all" link.
 * @param {{ title: string, subtitle?: string, to?: string, linkLabel?: string, className?: string }} props
 */
export default function SectionHeading({
  title,
  subtitle,
  to,
  linkLabel = 'View all',
  className,
}) {
  return (
    <div className={clsx('mb-6 flex items-end justify-between gap-4', className)}>
      <div>
        <h2 className="text-xl font-extrabold text-[#111111] sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-[#565959]">{subtitle}</p>}
      </div>
      {to && (
        <Link
          to={to}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-amazon-blue transition hover:gap-1.5 hover:text-amazon-dark"
        >
          {linkLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
