import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react'
import { getProductsByCategory } from '../../data/products'
import { getGuidesByCategory } from '../../data/guides'
import { getReviewsByCategory } from '../../data/reviews'
import { getAffiliateLink, affiliateLinkProps } from '../../utils/affiliateLink'
import { formatINR } from '../../utils/format'

/**
 * Mega-menu dropdown panel for a single category.
 * @param {{ category: object, onNavigate?: () => void }} props
 */
export default function MegaMenu({ category, onNavigate }) {
  if (!category) return null

  const topPicks = getProductsByCategory(category.id)
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  const guide = getGuidesByCategory(category.id)[0]
  const review = getReviewsByCategory(category.id)[0]

  return (
    <div className="animate-fade-in grid gap-6 p-6 md:grid-cols-[1fr_1.4fr_1fr]">
      {/* Column 1: subcategories */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#565959]">
          <category.icon className="h-4 w-4" strokeWidth={1.75} /> {category.label}
        </h3>
        <ul className="space-y-1">
          <li>
            <Link
              to={`/category/${category.id}`}
              onClick={onNavigate}
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm font-semibold text-amazon-blue transition hover:bg-gray-50"
            >
              All {category.label}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </li>
          {category.subcategories.map((sub) => (
            <li key={sub}>
              <Link
                to={`/category/${category.id}?sub=${encodeURIComponent(sub)}`}
                onClick={onNavigate}
                className="block rounded-md px-2 py-1.5 text-sm text-[#111111] transition hover:bg-gray-50 hover:text-amazon-blue"
              >
                {sub}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 2: top picks */}
      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-[#565959]">
          Top Picks
        </h3>
        <ul className="space-y-2">
          {topPicks.map((p) => (
            <li key={p.id}>
              <a
                href={getAffiliateLink(p.asin)}
                {...affiliateLinkProps}
                className="flex items-center gap-3 rounded-lg border border-transparent p-2 transition hover:border-gray-200 hover:bg-gray-50"
              >
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="h-12 w-12 shrink-0 rounded-md object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-1 text-sm font-medium text-[#111111]">
                    {p.name}
                  </span>
                  <span className="text-sm font-bold text-price-sale">
                    {formatINR(p.discountedPrice)}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 3: featured guide CTA */}
      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-[#565959]">
          Editor’s Resource
        </h3>
        {guide ? (
          <Link
            to={`/guide/${guide.slug}`}
            onClick={onNavigate}
            className="group flex h-full flex-col justify-between rounded-xl bg-gradient-to-br from-amazon-blue to-amazon-dark p-4 text-white"
          >
            <div>
              <BookOpen className="mb-2 h-6 w-6 text-amazon-orange" />
              <p className="text-sm font-bold leading-snug">{guide.title}</p>
              <p className="mt-1 line-clamp-2 text-xs text-white/70">{guide.summary}</p>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amazon-orange">
              Read the guide
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ) : review ? (
          <Link
            to={`/review/${review.slug}`}
            onClick={onNavigate}
            className="group flex h-full flex-col justify-between rounded-xl bg-gradient-to-br from-amazon-blue to-amazon-dark p-4 text-white"
          >
            <div>
              <BookOpen className="mb-2 h-6 w-6 text-amazon-orange" />
              <p className="text-sm font-bold leading-snug">{review.title}</p>
              <p className="mt-1 line-clamp-2 text-xs text-white/70">{review.summary}</p>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amazon-orange">
              Read the review
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ) : (
          <Link
            to={`/category/${category.id}`}
            onClick={onNavigate}
            className="flex h-full items-center justify-center rounded-xl border border-dashed border-gray-300 p-4 text-sm text-[#565959]"
          >
            Browse all {category.label}
          </Link>
        )}
      </div>
    </div>
  )
}
