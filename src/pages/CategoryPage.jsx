import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import Seo from '../components/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import FilterPanel from '../components/ui/FilterPanel'
import ProductCard from '../components/ui/ProductCard'
import EmptyState from '../components/ui/EmptyState'
import { ProductGridSkeleton } from '../components/ui/Skeleton'
import { getCategoryById } from '../data/categories'
import { getProductsByCategory } from '../data/products'
import { useFilter, SORT_OPTIONS } from '../hooks/useFilter'

const PAGE_SIZE = 9

export default function CategoryPage() {
  const { categoryId } = useParams()
  const [searchParams] = useSearchParams()
  const subParam = searchParams.get('sub') || undefined

  const category = getCategoryById(categoryId)
  const baseProducts = useMemo(
    () => getProductsByCategory(categoryId),
    [categoryId],
  )

  const priceBounds = useMemo(() => {
    if (!baseProducts.length) return { min: 0, max: 60000 }
    const prices = baseProducts.map((p) => p.discountedPrice)
    return { min: 0, max: Math.ceil(Math.max(...prices) / 100) * 100 }
  }, [baseProducts])

  const brands = useMemo(
    () => [...new Set(baseProducts.map((p) => p.brand))].sort(),
    [baseProducts],
  )

  const [filters, setFilters] = useState({ subcategory: subParam })
  const [sort, setSort] = useState('featured')
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Reset when the category or subcategory query changes.
  useEffect(() => {
    setFilters({ subcategory: subParam })
    setVisible(PAGE_SIZE)
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [categoryId, subParam])

  const filtered = useFilter(baseProducts, filters, sort)
  const visibleProducts = filtered.slice(0, visible)

  const resetFilters = () => {
    setFilters({})
    setVisible(PAGE_SIZE)
  }

  if (!category) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <Seo title="Category not found" noindex />
        <EmptyState
          title="Category not found"
          message="The category you’re looking for doesn’t exist. Explore our other categories instead."
          ctaTo="/"
          ctaLabel="Back to home"
        />
      </div>
    )
  }

  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-6">
      <Seo
        title={category.label}
        description={category.description}
        path={`/category/${category.id}`}
      />

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: category.label }]} />

      {/* Header */}
      <div className="mt-4">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold text-[#111111] sm:text-3xl">
          <span>{category.icon}</span> {category.label}
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-[#565959]">{category.description}</p>
      </div>

      <div className="mt-6 flex gap-8">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-40 rounded-xl border border-gray-200 bg-white p-5 shadow-card">
            <FilterPanel
              value={filters}
              onChange={(next) => {
                setFilters(next)
                setVisible(PAGE_SIZE)
              }}
              subcategories={category.subcategories}
              brands={brands}
              priceBounds={priceBounds}
              onReset={resetFilters}
            />
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Toolbar */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-sm text-[#565959]">
              {loading ? 'Loading…' : (
                <>
                  <span className="font-semibold text-[#111111]">{filtered.length}</span>{' '}
                  product{filtered.length !== 1 && 's'}
                </>
              )}
            </p>

            <div className="flex items-center gap-2">
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
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-[#111111] outline-none focus:border-amazon-orange"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <ProductGridSkeleton count={6} />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No products match your filters"
              message="Try removing a filter or lowering the minimum rating."
              ctaTo={`/category/${category.id}`}
              ctaLabel="Reset filters"
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

      {/* Mobile filter drawer */}
      {drawerOpen && (
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
                subcategories={category.subcategories}
                brands={brands}
                priceBounds={priceBounds}
                onReset={resetFilters}
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
