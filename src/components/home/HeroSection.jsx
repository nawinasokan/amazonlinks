import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Sparkles, Star } from 'lucide-react'
import { getFeaturedProducts } from '../../data/products'
import { formatINR } from '../../utils/format'

export default function HeroSection() {
  const floats = getFeaturedProducts().slice(0, 3)

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amazon-orange via-[#e8830b] to-amazon-dark">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-amazon-blue/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Trusted by 50,000+ smart shoppers
          </span>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Discover the Best Amazon Products —{' '}
            <span className="text-amazon-dark">Reviewed by Experts</span>
          </h1>

          <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">
            Hand-tested reviews, honest buying guides and the day’s biggest deals. Find the
            best. Buy with confidence.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/deals"
              className="inline-flex items-center gap-2 rounded-lg bg-amazon-dark px-6 py-3 text-sm font-bold text-white transition hover:brightness-125 active:scale-[0.99]"
            >
              Browse Deals <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-amazon-dark transition hover:bg-white/90 active:scale-[0.99]"
            >
              <BookOpen className="h-4 w-4" /> Read Buying Guides
            </Link>
          </div>
        </div>

        {/* Floating product mockups */}
        <div className="relative hidden h-80 lg:block">
          {floats.map((p, i) => (
            <Link
              key={p.id}
              to={`/category/${p.category}`}
              className="absolute w-48 rounded-2xl bg-white p-3 shadow-card-hover transition hover:shadow-2xl"
              style={{
                top: `${[0, 36, 12][i]}%`,
                left: `${[8, 44, 30][i]}%`,
                transform: `rotate(${[-6, 5, -2][i]}deg)`,
                zIndex: 3 - i,
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="aspect-square w-full rounded-lg object-cover"
              />
              <p className="mt-2 line-clamp-1 text-xs font-semibold text-[#111111]">
                {p.name}
              </p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm font-bold text-price-sale">
                  {formatINR(p.discountedPrice)}
                </span>
                <span className="flex items-center gap-0.5 text-xs font-semibold text-[#111111]">
                  <Star className="h-3 w-3 fill-star text-star" />
                  {p.rating}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
