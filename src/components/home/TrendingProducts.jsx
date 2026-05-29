import { useEffect, useState } from 'react'
import { TrendingUp } from 'lucide-react'
import products from '../../data/products'
import ProductCard from '../ui/ProductCard'
import { ProductGridSkeleton } from '../ui/Skeleton'

const trending = [...products]
  .sort((a, b) => b.reviewCount - a.reviewCount)
  .slice(0, 6)

export default function TrendingProducts() {
  // Brief simulated load to showcase skeleton states.
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6">
          <h2 className="inline-flex items-center gap-2 text-xl font-extrabold text-[#111111] sm:text-2xl">
            <TrendingUp className="h-6 w-6 text-amazon-orange" /> Trending Right Now
          </h2>
          <p className="mt-1 text-sm text-[#565959]">
            The products shoppers are loving this week.
          </p>
        </div>

        {loading ? (
          <ProductGridSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
