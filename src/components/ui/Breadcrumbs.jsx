import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import clsx from 'clsx'

/**
 * @param {{ items: { label: string, to?: string }[], className?: string }} props
 */
export default function Breadcrumbs({ items = [], className }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx('flex flex-wrap items-center gap-1.5 text-sm text-[#565959]', className)}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <Fragment key={`${item.label}-${i}`}>
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />}
            {item.to && !isLast ? (
              <Link to={item.to} className="transition hover:text-amazon-blue">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'font-medium text-[#111111]' : undefined}>
                {item.label}
              </span>
            )}
          </Fragment>
        )
      })}
    </nav>
  )
}
