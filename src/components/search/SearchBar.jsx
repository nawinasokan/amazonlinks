import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, TrendingUp, X } from 'lucide-react'
import clsx from 'clsx'
import { useSearch } from '../../hooks/useSearch'
import { getAffiliateLink, affiliateLinkProps } from '../../utils/affiliateLink'
import { formatINR } from '../../utils/format'

/**
 * Search bar with instant suggestion dropdown.
 * @param {{ className?: string, autoFocus?: boolean, onSubmitNavigate?: () => void }} props
 */
export default function SearchBar({ className, autoFocus = false, onSubmitNavigate }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const { results } = useSearch(query)
  const navigate = useNavigate()
  const containerRef = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const goToResults = () => {
    const q = query.trim()
    if (!q) return
    navigate(`/search?q=${encodeURIComponent(q)}`)
    setOpen(false)
    onSubmitNavigate?.()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    goToResults()
  }

  const suggestions = results.slice(0, 6)

  return (
    <div ref={containerRef} className={clsx('relative w-full', className)}>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center overflow-hidden rounded-lg bg-white ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-amazon-orange">
          <Search className="ml-3 h-4 w-4 shrink-0 text-[#565959]" />
          <input
            type="search"
            value={query}
            autoFocus={autoFocus}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search products, brands, deals…"
            aria-label="Search products"
            className="w-full bg-transparent px-3 py-2.5 text-sm text-[#111111] outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setOpen(false)
              }}
              aria-label="Clear search"
              className="px-2 text-[#565959] hover:text-[#111111]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="submit"
            className="h-full bg-amazon-orange px-4 py-2.5 text-sm font-bold text-amazon-dark transition hover:brightness-95"
          >
            Search
          </button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card-hover">
          {suggestions.length > 0 ? (
            <>
              <ul className="max-h-80 overflow-y-auto py-1">
                {suggestions.map((p) => (
                  <li key={p.id}>
                    <a
                      href={getAffiliateLink(p.asin)}
                      {...affiliateLinkProps}
                      className="flex items-center gap-3 px-3 py-2 transition hover:bg-gray-50"
                    >
                      <img
                        src={p.image}
                        alt=""
                        loading="lazy"
                        className="h-10 w-10 shrink-0 rounded-md object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-[#111111]">
                          {p.name}
                        </span>
                        <span className="text-xs text-[#565959]">{p.brand}</span>
                      </span>
                      <span className="shrink-0 text-sm font-bold text-[#111111]">
                        {formatINR(p.discountedPrice)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={goToResults}
                className="flex w-full items-center gap-2 border-t border-gray-100 bg-gray-50 px-3 py-2.5 text-left text-sm font-semibold text-amazon-blue transition hover:bg-gray-100"
              >
                <TrendingUp className="h-4 w-4" />
                See all results for “{query.trim()}”
              </button>
            </>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-[#565959]">
              No products match “{query.trim()}”.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
