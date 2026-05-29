import { useMemo, useState } from 'react'
import { Crown, ExternalLink, GitCompareArrows, Plus, Search, Trash2, X } from 'lucide-react'
import clsx from 'clsx'
import Seo from '../components/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import ComparisonTable from '../components/ui/ComparisonTable'
import EmptyState from '../components/ui/EmptyState'
import { useCompare } from '../context/CompareContext'
import { useSearch } from '../hooks/useSearch'
import { getProductsByIds, getFeaturedProducts } from '../data/products'
import { getAffiliateLink, affiliateLinkProps } from '../utils/affiliateLink'
import { formatINR } from '../utils/format'

function bestValueId(items) {
  if (!items.length) return null
  return items.reduce((best, p) =>
    p.rating / p.discountedPrice > best.rating / best.discountedPrice ? p : best,
  ).id
}

export default function ComparePage() {
  const { ids, count, max, isFull, isInCompare, addToCompare, removeFromCompare, clearCompare } =
    useCompare()
  const [query, setQuery] = useState('')
  const { results } = useSearch(query)

  const selected = getProductsByIds(ids)
  const bestId = useMemo(() => bestValueId(selected), [selected])
  const bestProduct = selected.find((p) => p.id === bestId)

  // Picker suggestions: search results, else featured products not already added.
  const suggestions = (query.trim() ? results : getFeaturedProducts())
    .filter((p) => !ids.includes(p.id))
    .slice(0, 8)

  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-6">
      <Seo
        title="Compare Products"
        description="Compare up to 4 Amazon products side by side — ratings, prices and key specs — and see the best value pick instantly."
        path="/compare"
      />

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Compare' }]} />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold text-[#111111] sm:text-3xl">
            <GitCompareArrows className="h-7 w-7 text-amazon-orange" /> Compare Products
          </h1>
          <p className="mt-2 text-sm text-[#565959]">
            Add up to {max} products to compare them side by side. We’ll highlight the best
            value automatically.
          </p>
        </div>
        {count > 0 && (
          <button
            type="button"
            onClick={clearCompare}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-[#565959] transition hover:border-price-sale hover:text-price-sale"
          >
            <Trash2 className="h-4 w-4" /> Clear all
          </button>
        )}
      </div>

      {/* Selected chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        {Array.from({ length: max }).map((_, i) => {
          const product = selected[i]
          return product ? (
            <span
              key={product.id}
              className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3 text-sm shadow-card ring-1 ring-gray-200"
            >
              <img
                src={product.image}
                alt=""
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="max-w-[10rem] truncate font-medium text-[#111111]">
                {product.brand}
              </span>
              <button
                type="button"
                onClick={() => removeFromCompare(product.id)}
                aria-label={`Remove ${product.name}`}
                className="text-[#565959] hover:text-price-sale"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ) : (
            <span
              key={`slot-${i}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-gray-300 px-4 py-1.5 text-sm text-[#9a9a9a]"
            >
              <Plus className="h-4 w-4" /> Empty slot
            </span>
          )
        })}
      </div>

      {/* Picker */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-card">
        <div className="flex items-center gap-2 rounded-lg ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-amazon-orange">
          <Search className="ml-3 h-4 w-4 text-[#565959]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products to add…"
            className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
          />
        </div>

        <p className="mt-4 mb-2 text-xs font-bold uppercase tracking-wide text-[#565959]">
          {query.trim() ? 'Search results' : 'Popular products'}
        </p>

        {suggestions.length === 0 ? (
          <p className="py-4 text-sm text-[#565959]">
            {isFull
              ? `You’ve reached the maximum of ${max} products.`
              : 'No products match your search.'}
          </p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {suggestions.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-3 rounded-lg border border-gray-100 p-2"
              >
                <img src={p.image} alt="" className="h-12 w-12 shrink-0 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#111111]">{p.name}</p>
                  <p className="text-sm font-bold text-price-sale">
                    {formatINR(p.discountedPrice)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => addToCompare(p.id)}
                  disabled={isFull || isInCompare(p.id)}
                  className={clsx(
                    'shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition',
                    isFull || isInCompare(p.id)
                      ? 'cursor-not-allowed bg-gray-100 text-[#9a9a9a]'
                      : 'bg-amazon-orange text-amazon-dark hover:brightness-95',
                  )}
                >
                  {isInCompare(p.id) ? 'Added' : 'Add'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Comparison */}
      <div className="mt-8">
        {selected.length < 2 ? (
          <EmptyState
            title="Add products to compare"
            message="Select at least two products above to see a full side-by-side comparison."
            ctaTo="/deals"
            ctaLabel="Browse products"
            icon={GitCompareArrows}
          />
        ) : (
          <>
            <ComparisonTable products={selected} highlightId={bestId} />

            {bestProduct && (
              <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-br from-amazon-blue to-amazon-dark p-6 text-center text-white">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amazon-orange px-3 py-1 text-xs font-bold uppercase text-amazon-dark">
                  <Crown className="h-3.5 w-3.5" /> Best Value Pick
                </span>
                <p className="text-lg font-bold">{bestProduct.name}</p>
                <p className="text-sm text-white/70">
                  Best balance of rating and price among your selection.
                </p>
                <a
                  href={getAffiliateLink(bestProduct.asin)}
                  {...affiliateLinkProps}
                  className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-amazon-orange px-6 py-3 text-sm font-bold text-amazon-dark transition hover:brightness-95"
                >
                  Buy Best Pick on Amazon <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
