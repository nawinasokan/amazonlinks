import { useParams } from 'react-router-dom'
import { Calendar, Clock, ExternalLink, User } from 'lucide-react'
import Seo from '../components/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import AffiliateDisclaimer from '../components/ui/AffiliateDisclaimer'
import ComparisonTable from '../components/ui/ComparisonTable'
import ProsConsList from '../components/ui/ProsConsList'
import FaqAccordion from '../components/ui/FaqAccordion'
import ArticleCard from '../components/ui/ArticleCard'
import StarRating from '../components/ui/StarRating'
import LazyImage from '../components/ui/LazyImage'
import EmptyState from '../components/ui/EmptyState'
import Badge from '../components/ui/Badge'
import { getReviewBySlug, getRelatedReviews } from '../data/reviews'
import { getProductById, getProductsByIds } from '../data/products'
import { getCategoryById } from '../data/categories'
import { getAffiliateLink, affiliateLinkProps } from '../utils/affiliateLink'
import { formatINR, formatDate } from '../utils/format'

function sectionMeta(section, index) {
  switch (section.type) {
    case 'intro':
      return { id: 'introduction', label: 'Introduction' }
    case 'comparison_table':
      return { id: 'comparison', label: section.heading || 'Quick Comparison' }
    case 'review': {
      const p = getProductById(section.productId)
      return { id: `review-${section.productId}`, label: p ? p.brand : `Pick ${index}` }
    }
    case 'buying_guide':
      return { id: 'buying-guide', label: section.heading || 'Buying Guide' }
    case 'faq':
      return { id: 'faq', label: 'FAQ' }
    default:
      return { id: `section-${index}`, label: 'Section' }
  }
}

function ScoreBadge({ score }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-amazon-dark px-4 py-2 text-white">
      <span className="text-2xl font-extrabold leading-none">{score}</span>
      <span className="text-[10px] uppercase tracking-wide text-white/60">/ 10</span>
    </div>
  )
}

function ReviewDeepDive({ section }) {
  const product = getProductById(section.productId)
  if (!product) return null
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row">
        <a
          href={getAffiliateLink(product.asin)}
          {...affiliateLinkProps}
          className="mx-auto w-40 shrink-0 sm:mx-0"
        >
          <LazyImage src={product.image} alt={product.name} className="aspect-square w-full rounded-xl" />
        </a>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              {section.verdict && (
                <span className="inline-block rounded-full bg-price-savings/10 px-2.5 py-0.5 text-xs font-bold text-price-savings">
                  {section.verdict}
                </span>
              )}
              <h3 className="mt-1.5 text-lg font-bold text-[#111111]">{product.name}</h3>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                {product.badge && <Badge label={product.badge} />}
              </div>
            </div>
            {section.score != null && <ScoreBadge score={section.score} />}
          </div>

          <p className="mt-3 text-sm leading-relaxed text-[#565959]">{section.content}</p>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-2">
            <span className="text-xl font-bold text-[#111111]">
              {formatINR(product.discountedPrice)}
            </span>
            {product.originalPrice > product.discountedPrice && (
              <span className="text-sm text-price-original line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
            {product.discountPercent > 0 && (
              <span className="text-sm font-semibold text-price-savings">
                {product.discountPercent}% off
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <ProsConsList pros={product.pros} cons={product.cons} />
      </div>

      <a
        href={getAffiliateLink(product.asin)}
        {...affiliateLinkProps}
        className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-amazon-orange px-4 py-3 text-sm font-bold text-amazon-dark transition hover:brightness-95 sm:w-auto"
      >
        Check Price on Amazon <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  )
}

export default function ProductReviewPage() {
  const { slug } = useParams()
  const review = getReviewBySlug(slug)

  if (!review) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <Seo title="Review not found" noindex />
        <EmptyState
          title="Review not found"
          message="This review doesn’t exist or may have been moved."
          ctaTo="/reviews"
          ctaLabel="Browse all reviews"
        />
      </div>
    )
  }

  const category = getCategoryById(review.category)
  const toc = review.sections.map((s, i) => sectionMeta(s, i))
  const related = getRelatedReviews(slug, 3)

  return (
    <div className="animate-fade-in">
      <Seo
        title={review.title}
        description={review.summary}
        path={`/review/${review.slug}`}
        image={review.heroImage}
        type="article"
      />

      {/* Hero */}
      <div className="relative">
        <div className="absolute inset-0">
          <img src={review.heroImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-amazon-dark via-amazon-dark/80 to-amazon-dark/40" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <Breadcrumbs
            className="text-white/70 [&_a:hover]:text-amazon-orange [&_span]:text-white"
            items={[
              { label: 'Home', to: '/' },
              { label: 'Reviews', to: '/reviews' },
              { label: review.title },
            ]}
          />
          {category && (
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amazon-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-amazon-dark">
              <category.icon className="h-3.5 w-3.5" strokeWidth={1.75} /> {category.label}
            </span>
          )}
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {review.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">{review.summary}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {review.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {formatDate(review.publishedDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {review.readingTime} min read
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <AffiliateDisclaimer className="mb-8" />

        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-40">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#565959]">
                Jump to Section
              </p>
              <nav className="space-y-1 border-l border-gray-200">
                {toc.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className="-ml-px block border-l-2 border-transparent py-1.5 pl-3 text-sm text-[#565959] transition hover:border-amazon-orange hover:text-amazon-dark"
                  >
                    {t.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Sections */}
          <article className="min-w-0 space-y-10">
            {review.sections.map((section, i) => {
              const meta = sectionMeta(section, i)
              return (
                <section key={meta.id} id={meta.id} className="scroll-mt-44">
                  {section.type === 'intro' && (
                    <p className="text-base leading-relaxed text-[#333]">{section.content}</p>
                  )}

                  {section.type === 'comparison_table' && (
                    <div>
                      <h2 className="mb-4 text-xl font-bold text-[#111111]">
                        {section.heading || 'Quick Comparison'}
                      </h2>
                      <ComparisonTable
                        products={getProductsByIds(section.productIds)}
                        highlightId={review.topPick}
                      />
                    </div>
                  )}

                  {section.type === 'review' && <ReviewDeepDive section={section} />}

                  {section.type === 'buying_guide' && (
                    <div className="rounded-2xl bg-gray-50 p-5 sm:p-6">
                      <h2 className="mb-3 text-xl font-bold text-[#111111]">
                        {section.heading || 'Buying Guide'}
                      </h2>
                      <p className="text-base leading-relaxed text-[#565959]">
                        {section.content}
                      </p>
                    </div>
                  )}

                  {section.type === 'faq' && (
                    <div>
                      <h2 className="mb-4 text-xl font-bold text-[#111111]">
                        Frequently Asked Questions
                      </h2>
                      <FaqAccordion items={section.items} />
                    </div>
                  )}
                </section>
              )
            })}
          </article>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-6 text-xl font-bold text-[#111111]">Related Reviews</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ArticleCard key={r.id} article={r} to={`/review/${r.slug}`} kind="Review" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
