import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react'
import { Link } from 'react-router-dom'
import deals from '../../data/deals'
import { getProductById } from '../../data/products'
import DealCard from '../ui/DealCard'

export default function FeaturedDeals() {
  const scrollRef = useRef(null)

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  const topDeals = deals.slice(0, 8)

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="inline-flex items-center gap-2 text-xl font-extrabold text-[#111111] sm:text-2xl">
            <Flame className="h-6 w-6 text-amazon-orange" /> Today’s Top Deals
          </h2>
          <p className="mt-1 text-sm text-[#565959]">
            Hand-picked discounts, refreshed daily. Grab them before the timer runs out.
          </p>
          <Link
            to="/deals"
            className="mt-1 inline-block text-sm font-semibold text-amazon-blue hover:text-amazon-dark sm:hidden"
          >
            View all deals →
          </Link>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-[#565959] transition hover:border-amazon-orange hover:text-amazon-orange"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-[#565959] transition hover:border-amazon-orange hover:text-amazon-orange"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
      >
        {topDeals.map((deal) => {
          const product = getProductById(deal.productId)
          if (!product) return null
          return (
            <div key={deal.id} className="w-64 shrink-0 snap-start sm:w-72">
              <DealCard deal={deal} product={product} className="h-full" />
            </div>
          )
        })}
      </div>

      <div className="mt-4 hidden justify-center sm:flex">
        <Link
          to="/deals"
          className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-amazon-dark transition hover:border-amazon-orange hover:text-amazon-orange"
        >
          View all deals →
        </Link>
      </div>
    </section>
  )
}
