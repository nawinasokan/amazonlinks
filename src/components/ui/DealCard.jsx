import { ArrowRight, Tag, Zap } from 'lucide-react'
import clsx from 'clsx'
import LazyImage from './LazyImage'
import StarRating from './StarRating'
import CountdownTimer from './CountdownTimer'
import { getAffiliateLink, affiliateLinkProps } from '../../utils/affiliateLink'
import { formatINR, savingsAmount } from '../../utils/format'

const DEAL_TYPE_STYLES = {
  'Lightning Deal': { className: 'bg-amazon-orange text-amazon-dark', Icon: Zap },
  'Limited Time': { className: 'bg-amazon-blue text-white', Icon: Tag },
  Coupon: { className: 'bg-price-savings text-white', Icon: Tag },
}

/**
 * Deal card combining a product with its active deal.
 * @param {{ deal: object, product: object, className?: string }} props
 */
export default function DealCard({ deal, product, className }) {
  if (!product) return null
  const typeStyle = DEAL_TYPE_STYLES[deal?.dealType] || DEAL_TYPE_STYLES['Limited Time']
  const { Icon } = typeStyle
  const affiliateUrl = getAffiliateLink(product.asin)

  return (
    <article
      className={clsx(
        'group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover',
        className,
      )}
    >
      <div className="relative">
        <a href={affiliateUrl} {...affiliateLinkProps} aria-label={`View ${product.name} on Amazon`}>
          <LazyImage src={product.image} alt={product.name} className="aspect-[4/3] w-full" />
        </a>

        {/* Big discount badge */}
        <div className="absolute left-0 top-3 rounded-r-full bg-price-sale px-3 py-1 text-sm font-extrabold text-white shadow">
          {product.discountPercent}% OFF
        </div>

        {/* Deal type pill */}
        {deal?.dealType && (
          <div
            className={clsx(
              'absolute right-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase shadow-sm',
              typeStyle.className,
            )}
          >
            <Icon className="h-3 w-3" />
            {deal.dealType}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <p className="text-xs font-medium uppercase tracking-wide text-[#565959]">
          {product.brand}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-[#111111]">
          {product.name}
        </h3>

        <div className="mt-2">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="text-lg font-bold text-[#111111]">
            {formatINR(product.discountedPrice)}
          </span>
          <span className="text-sm text-price-original line-through">
            {formatINR(product.originalPrice)}
          </span>
        </div>
        <p className="mt-0.5 text-xs font-semibold text-price-savings">
          You save {savingsAmount(product.originalPrice, product.discountedPrice)}
        </p>

        {/* Countdown */}
        {deal?.expiresAt && (
          <div className="mt-3 rounded-lg bg-gray-50 px-3 py-2">
            <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-[#565959]">
              Deal ends in
            </p>
            <CountdownTimer expiresAt={deal.expiresAt} />
          </div>
        )}

        <div className="mt-auto pt-3.5">
          <a
            href={affiliateUrl}
            {...affiliateLinkProps}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-amazon-orange px-3 py-2.5 text-sm font-bold text-amazon-dark transition hover:brightness-95 active:scale-[0.99]"
          >
            Grab Deal <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  )
}
