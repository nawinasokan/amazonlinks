import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import Seo from '../components/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import FilterPanel from '../components/ui/FilterPanel'
import ProductCard from '../components/ui/ProductCard'
import EmptyState from '../components/ui/EmptyState'
import { ProductGridSkeleton } from '../components/ui/Skeleton'
import products from '../data/products'
import { useFilter, SORT_OPTIONS } from '../hooks/useFilter'

const PAGE_SIZE = 9

function matchesQuery(product, q) {
  const haystack = [product.name, product.brand, product.subcategory, product.summary, ...(product.tags || [])]
    .join(' ')
    .toLowerCase()
  return haystack.includes(q)
}

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = (searchParams.get('q') || '').trim()

  const baseProducts = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return []
    return products.filter((p) => matchesQuery(p, q))
  }, [query])

  const brands = useMemo(
    () => [...new Set(baseProducts.map((p) => p.brand))].sort(),
    [baseProducts],
  )
  const priceBounds = useMemo(() => {
    if (!baseProducts.length) return { min: 0, max: 60000 }
    return {
      min: 0,
      max: Math.ceil(Math.max(...baseProducts.map((p) => p.discountedPrice)) / 100) * 100,
    }
  }, [baseProducts])

  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState('featured')
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setFilters({})
    setVisible(PAGE_SIZE)
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(t)
  }, [query])

  const filtered = useFilter(baseProducts, filters, sort)
  const visibleProducts = filtered.slice(0, visible)

  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-6">
      <Seo
        title={query ? `Search: ${query}` : 'Search'}
        description={`Search results for "${query}" on AmazonLinks.`}
        path="/search"
        noindex
      />

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Search' }]} />

      <div className="mt-4">
        <h1 className="text-2xl font-extrabold text-[#111111] sm:text-3xl">
          {query ? (
            <>
              <span className="text-[#565959]">Results for</span> “{query}”
            </>
          ) : (
            'Search products'
          )}
        </h1>
        {query && !loading && (
          <p className="mt-1 text-sm text-[#565959]">
            {filtered.length} product{filtered.length !== 1 && 's'} found
          </p>
        )}
      </div>

      {!query ? (
        <div className="mt-8">
          <EmptyState
            title="Start typing to search"
            message="Use the search bar above to find products by name, brand or category."
            ctaTo="/deals"
            ctaLabel="Browse deals instead"
          />
        </div>
      ) : baseProducts.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title={`No results for “${query}”`}
            message="We couldn’t find any products matching your search. Try a different keyword or browse today’s deals."
            ctaTo="/deals"
            ctaLabel="Browse all deals"
          />
        </div>
      ) : (
        <div className="mt-6 flex gap-8">
          {/* Sidebar */}
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="sticky top-40 rounded-xl border border-gray-200 bg-white p-5 shadow-card">
              <FilterPanel
                value={filters}
                onChange={(next) => {
                  setFilters(next)
                  setVisible(PAGE_SIZE)
                }}
                brands={brands}
                priceBounds={priceBounds}
                onReset={() => {
                  setFilters({})
                  setVisible(PAGE_SIZE)
                }}
              />
            </div>
          </aside>

          {/* Main */}
          <div className="min-w-0 flex-1">
            <div className="mb-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-[#111111] lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
              <label className="flex items-center gap-2 text-sm">
                <span className="hidden text-[#565959] sm:inline">Sort by</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-amazon-orange"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {loading ? (
              <ProductGridSkeleton count={6} />
            ) : filtered.length === 0 ? (
              <EmptyState
                title="No products match your filters"
                message="Try removing a filter to see more results."
                ctaTo="/search"
                ctaLabel="Browse deals"
              />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
                {visible < filtered.length && (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setVisible((v) => v + PAGE_SIZE)}
                      className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-bold text-amazon-dark transition hover:border-amazon-orange hover:text-amazon-orange"
                    >
                      Load More ({filtered.length - visible} left)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile filter drawer */}
      {drawerOpen && baseProducts.length > 0 && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="animate-slide-in-left absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
              <h2 className="text-base font-bold text-[#111111]">Filters</h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
                className="text-[#565959]"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <FilterPanel
                value={filters}
                onChange={(next) => {
                  setFilters(next)
                  setVisible(PAGE_SIZE)
                }}
                brands={brands}
                priceBounds={priceBounds}
                onReset={() => {
                  setFilters({})
                  setVisible(PAGE_SIZE)
                }}
              />
            </div>
            <div className="border-t border-gray-200 p-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-full rounded-lg bg-amazon-orange px-4 py-3 text-sm font-bold text-amazon-dark"
              >
                Show {filtered.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
