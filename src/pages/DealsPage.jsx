import { useMemo, useState } from 'react'
import { Flame, Zap } from 'lucide-react'
import clsx from 'clsx'
import Seo from '../components/Seo'
import DealCard from '../components/ui/DealCard'
import EmptyState from '../components/ui/EmptyState'
import deals from '../data/deals'
import { getProductById } from '../data/products'
import categories from '../data/categories'

const SORTS = [
  { value: 'discount', label: 'Biggest Discount' },
  { value: 'ending', label: 'Ending Soon' },
  { value: 'popular', label: 'Most Popular' },
]

export default function DealsPage() {
  // Join each deal with its product once.
  const dealItems = useMemo(
    () =>
      deals
        .map((deal) => ({ deal, product: getProductById(deal.productId) }))
        .filter((d) => d.product),
    [],
  )

  // Build tabs: All + Lightning Deals + categories that actually have deals.
  const dealCategoryIds = useMemo(
    () => new Set(dealItems.map((d) => d.product.category)),
    [dealItems],
  )
  const tabs = useMemo(
    () => [
      { id: 'all', label: 'All Deals' },
      { id: 'lightning', label: 'Lightning Deals' },
      ...categories
        .filter((c) => dealCategoryIds.has(c.id))
        .map((c) => ({ id: c.id, label: c.label })),
    ],
    [dealCategoryIds],
  )

  const [tab, setTab] = useState('all')
  const [sort, setSort] = useState('discount')

  const visible = useMemo(() => {
    let list = dealItems
    if (tab === 'lightning') {
      list = list.filter((d) => d.deal.dealType === 'Lightning Deal')
    } else if (tab !== 'all') {
      list = list.filter((d) => d.product.category === tab)
    }

    const sorted = [...list]
    switch (sort) {
      case 'ending':
        sorted.sort(
          (a, b) => new Date(a.deal.expiresAt) - new Date(b.deal.expiresAt),
        )
        break
      case 'popular':
        sorted.sort((a, b) => b.product.reviewCount - a.product.reviewCount)
        break
      case 'discount':
      default:
        sorted.sort((a, b) => b.product.discountPercent - a.product.discountPercent)
    }
    return sorted
  }, [dealItems, tab, sort])

  return (
    <div className="animate-fade-in">
      <Seo
        title="Today’s Best Amazon Deals"
        description="The biggest Amazon India deals, refreshed daily — lightning deals, coupons and limited-time offers across electronics, home, fashion and more."
        path="/deals"
      />

      {/* Banner */}
      <section className="bg-gradient-to-r from-amazon-orange to-[#e8830b]">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h1 className="flex items-center gap-2 text-2xl font-extrabold text-amazon-dark sm:text-3xl">
            <Flame className="h-7 w-7" /> Today’s Best Amazon Deals
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-amazon-dark/80">
            Hand-picked discounts updated daily. Prices and availability change fast — grab
            them before the timers run out.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Tabs + sort */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={clsx(
                  'inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition',
                  tab === t.id
                    ? 'bg-amazon-dark text-white'
                    : 'bg-white text-[#565959] ring-1 ring-gray-200 hover:ring-amazon-orange',
                )}
              >
                {t.id === 'lightning' && <Zap className="h-3.5 w-3.5" />}
                {t.label}
              </button>
            ))}
          </div>

          <label className="flex shrink-0 items-center gap-2 text-sm">
            <span className="text-[#565959]">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-[#111111] outline-none focus:border-amazon-orange"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Deals grid */}
        {visible.length === 0 ? (
          <EmptyState
            title="No deals here right now"
            message="There are no active deals in this filter. Check the other tabs or come back soon."
            ctaTo="/deals"
            ctaLabel="View all deals"
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map(({ deal, product }) => (
              <DealCard key={deal.id} deal={deal} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
