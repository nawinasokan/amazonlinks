import { useState } from 'react'
import clsx from 'clsx'
import categories from '../../data/categories'
import { getProductsByCategory } from '../../data/products'
import ProductCard from '../ui/ProductCard'
import SectionHeading from '../ui/SectionHeading'

// Use a focused set of tabs for the homepage.
const TAB_IDS = ['electronics', 'home-kitchen', 'books', 'fashion', 'sports-fitness']
const TABS = TAB_IDS.map((id) => categories.find((c) => c.id === id)).filter(Boolean)

export default function TopPicksSection() {
  const [active, setActive] = useState(TABS[0].id)

  const picks = getProductsByCategory(active)
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeading
        title="Our #1 Picks by Category"
        subtitle="The single best product we’d recommend in each category, right now."
      />

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition',
              active === tab.id
                ? 'bg-amazon-dark text-white'
                : 'bg-white text-[#565959] ring-1 ring-gray-200 hover:ring-amazon-orange',
            )}
          >
            <tab.icon className="h-4 w-4" strokeWidth={1.75} />
            {tab.label}
          </button>
        ))}
      </div>

      <div key={active} className="animate-fade-in grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
