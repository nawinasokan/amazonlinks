import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  ChevronDown,
  GitCompareArrows,
  Link2,
  Menu,
  X,
} from 'lucide-react'
import clsx from 'clsx'
import SearchBar from '../search/SearchBar'
import MegaMenu from './MegaMenu'
import categories from '../../data/categories'
import { useCompare } from '../../context/CompareContext'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/deals', label: 'Deals' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/guides', label: 'Buying Guides' },
  { to: '/compare', label: 'Compare' },
]

function Logo({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex shrink-0 items-center gap-2"
      aria-label="AmazonLinks home"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amazon-orange">
        <Link2 className="h-5 w-5 text-amazon-dark" />
      </span>
      <span className="text-lg font-extrabold tracking-tight text-white">
        Amazon<span className="text-amazon-orange">Links</span>
      </span>
    </Link>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMega, setActiveMega] = useState(null)
  const [openMobileCat, setOpenMobileCat] = useState(null)
  const location = useLocation()
  const { count } = useCompare()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on route change.
  useEffect(() => {
    setMobileOpen(false)
    setActiveMega(null)
  }, [location])

  // Lock body scroll when the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const navLinkClass = ({ isActive }) =>
    clsx(
      'text-sm font-medium transition',
      isActive ? 'text-amazon-orange' : 'text-white/90 hover:text-amazon-orange',
    )

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-50 bg-amazon-dark transition-shadow duration-200',
          scrolled && 'shadow-lg',
        )}
      >
        {/* Top bar */}
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-5">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Logo />

          {/* Center search (desktop) */}
          <div className="hidden flex-1 md:block">
            <SearchBar />
          </div>

          {/* Right nav (desktop) */}
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Compare indicator */}
          <Link
            to="/compare"
            className="relative ml-auto flex items-center text-white/90 transition hover:text-amazon-orange lg:ml-0"
            aria-label={`Compare (${count} selected)`}
          >
            <GitCompareArrows className="h-6 w-6" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-amazon-orange px-1 text-[11px] font-bold text-amazon-dark">
                {count}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile search */}
        <div className="px-4 pb-3 md:hidden">
          <SearchBar />
        </div>

        {/* Category pills + mega menu (desktop) */}
        <div
          className="relative hidden border-t border-white/10 md:block"
          onMouseLeave={() => setActiveMega(null)}
        >
          <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                onMouseEnter={() => setActiveMega(cat.id)}
                className={clsx(
                  'flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-2.5 text-sm font-medium transition',
                  activeMega === cat.id
                    ? 'text-amazon-orange'
                    : 'text-white/80 hover:text-amazon-orange',
                )}
              >
                <cat.icon className="h-4 w-4" strokeWidth={1.75} />
                {cat.label}
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Link>
            ))}
          </div>

          {/* Mega panel */}
          {activeMega && (
            <div className="absolute inset-x-0 top-full z-40 border-t border-gray-200 bg-white shadow-card-hover">
              <div className="mx-auto max-w-7xl">
                <MegaMenu
                  category={categories.find((c) => c.id === activeMega)}
                  onNavigate={() => setActiveMega(null)}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="animate-slide-in-left absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-amazon-dark">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <Logo onClick={() => setMobileOpen(false)} />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <nav className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      clsx(
                        'block rounded-lg px-3 py-2.5 text-sm font-semibold transition',
                        isActive
                          ? 'bg-white/10 text-amazon-orange'
                          : 'text-white/90 hover:bg-white/5',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <p className="mt-5 mb-2 px-3 text-xs font-bold uppercase tracking-wide text-white/40">
                Categories
              </p>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <div className="flex items-center">
                      <Link
                        to={`/category/${cat.id}`}
                        className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-white/90 transition hover:bg-white/5"
                      >
                        <cat.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                        {cat.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMobileCat((id) => (id === cat.id ? null : cat.id))
                        }
                        aria-label={`Toggle ${cat.label} subcategories`}
                        className="px-3 py-2.5 text-white/60"
                      >
                        <ChevronDown
                          className={clsx(
                            'h-4 w-4 transition-transform',
                            openMobileCat === cat.id && 'rotate-180',
                          )}
                        />
                      </button>
                    </div>
                    {openMobileCat === cat.id && (
                      <ul className="ml-8 space-y-1 border-l border-white/10 pl-3">
                        {cat.subcategories.map((sub) => (
                          <li key={sub}>
                            <Link
                              to={`/category/${cat.id}?sub=${encodeURIComponent(sub)}`}
                              className="block rounded-md px-2 py-2 text-sm text-white/70 transition hover:text-amazon-orange"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
