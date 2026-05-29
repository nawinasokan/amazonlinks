import { useParams } from 'react-router-dom'
import {
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  ListChecks,
  User,
} from 'lucide-react'
import Seo from '../components/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import AffiliateDisclaimer from '../components/ui/AffiliateDisclaimer'
import ComparisonTable from '../components/ui/ComparisonTable'
import FaqAccordion from '../components/ui/FaqAccordion'
import StarRating from '../components/ui/StarRating'
import LazyImage from '../components/ui/LazyImage'
import EmptyState from '../components/ui/EmptyState'
import { getGuideBySlug } from '../data/guides'
import { getProductById, getProductsByIds } from '../data/products'
import { getCategoryById } from '../data/categories'
import { getAffiliateLink, affiliateLinkProps } from '../utils/affiliateLink'
import { formatINR, formatDate } from '../utils/format'

function RecommendationCard({ rec, index }) {
  const product = getProductById(rec.productId)
  if (!product) return null
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-card sm:flex-row">
      <div className="flex shrink-0 items-start gap-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amazon-dark text-sm font-bold text-white">
          {index + 1}
        </span>
        <a href={getAffiliateLink(product.asin)} {...affiliateLinkProps} className="w-28">
          <LazyImage src={product.image} alt={product.name} className="aspect-square w-full rounded-xl" />
        </a>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-amazon-orange/15 px-2.5 py-0.5 text-xs font-bold text-[#7a4a00]">
            Expert Score {rec.expertScore}
          </span>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>
        <h3 className="mt-1.5 text-base font-bold text-[#111111]">{product.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-[#565959]">{rec.note}</p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#111111]">
              {formatINR(product.discountedPrice)}
            </span>
            {product.originalPrice > product.discountedPrice && (
              <span className="text-sm text-price-original line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>
          <a
            href={getAffiliateLink(product.asin)}
            {...affiliateLinkProps}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amazon-orange px-4 py-2 text-sm font-bold text-amazon-dark transition hover:brightness-95"
          >
            Check Price <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function BuyingGuidePage() {
  const { slug } = useParams()
  const guide = getGuideBySlug(slug)

  if (!guide) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <Seo title="Guide not found" noindex />
        <EmptyState
          title="Guide not found"
          message="This buying guide doesn’t exist or may have been moved."
          ctaTo="/guides"
          ctaLabel="Browse all guides"
        />
      </div>
    )
  }

  const category = getCategoryById(guide.category)

  return (
    <div className="animate-fade-in">
      <Seo
        title={guide.title}
        description={guide.summary}
        path={`/guide/${guide.slug}`}
        image={guide.heroImage}
        type="article"
      />

      {/* Hero */}
      <div className="relative">
        <div className="absolute inset-0">
          <img src={guide.heroImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-amazon-dark via-amazon-dark/80 to-amazon-dark/40" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <Breadcrumbs
            className="text-white/70 [&_a:hover]:text-amazon-orange [&_span]:text-white"
            items={[
              { label: 'Home', to: '/' },
              { label: 'Buying Guides', to: '/guides' },
              { label: guide.title },
            ]}
          />
          <span className="mt-4 inline-block rounded-full bg-amazon-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-amazon-dark">
            Buying Guide{category ? ` · ${category.label}` : ''}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">{guide.summary}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {guide.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {formatDate(guide.publishedDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {guide.readingTime} min read
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <AffiliateDisclaimer className="mb-8" />

        <p className="text-base leading-relaxed text-[#333]">{guide.intro}</p>

        {/* What to look for */}
        <section className="mt-12 scroll-mt-44">
          <h2 className="flex items-center gap-2 text-2xl font-extrabold text-[#111111]">
            <ListChecks className="h-6 w-6 text-amazon-orange" /> What to Look For
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {guide.whatToLookFor.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-card"
              >
                <h3 className="flex items-center gap-2 text-base font-bold text-[#111111]">
                  <CheckCircle2 className="h-5 w-5 text-price-savings" /> {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#565959]">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Top recommendations */}
        <section className="mt-12 scroll-mt-44">
          <h2 className="text-2xl font-extrabold text-[#111111]">Top Recommendations</h2>
          <p className="mt-1 text-sm text-[#565959]">
            Our expert-scored picks, ranked. Every link is an affiliate link — we may earn a
            commission at no extra cost to you.
          </p>
          <div className="mt-5 space-y-4">
            {guide.recommendations.map((rec, i) => (
              <RecommendationCard key={rec.productId} rec={rec} index={i} />
            ))}
          </div>
        </section>

        {/* Comparison */}
        {guide.comparisonProductIds?.length > 0 && (
          <section className="mt-12 scroll-mt-44">
            <h2 className="mb-5 text-2xl font-extrabold text-[#111111]">Side-by-Side Comparison</h2>
            <ComparisonTable
              products={getProductsByIds(guide.comparisonProductIds)}
              highlightId={guide.recommendations[0]?.productId}
            />
          </section>
        )}

        {/* FAQ */}
        {guide.faq?.length > 0 && (
          <section className="mt-12 scroll-mt-44">
            <h2 className="mb-5 text-2xl font-extrabold text-[#111111]">
              Frequently Asked Questions
            </h2>
            <FaqAccordion items={guide.faq} />
          </section>
        )}
      </div>
    </div>
  )
}
