import { NavLink } from 'react-router-dom'
import { GitCompareArrows, Home, Search, Tag } from 'lucide-react'
import clsx from 'clsx'
import { useCompare } from '../../context/CompareContext'

const ITEMS = [
  { to: '/', label: 'Home', Icon: Home, end: true },
  { to: '/deals', label: 'Deals', Icon: Tag },
  { to: '/search', label: 'Search', Icon: Search },
  { to: '/compare', label: 'Compare', Icon: GitCompareArrows, badge: true },
]

export default function MobileNav() {
  const { count } = useCompare()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur sm:hidden">
      <div className="grid grid-cols-4">
        {ITEMS.map(({ to, label, Icon, end, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              clsx(
                'relative flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition',
                isActive ? 'text-amazon-orange' : 'text-[#565959]',
              )
            }
          >
            <span className="relative">
              <Icon className="h-5 w-5" />
              {badge && count > 0 && (
                <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-amazon-orange px-1 text-[9px] font-bold text-amazon-dark">
                  {count}
                </span>
              )}
            </span>
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
