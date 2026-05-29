import { Check, ExternalLink, GitCompareArrows } from 'lucide-react'
import clsx from 'clsx'
import Badge from './Badge'
import StarRating from './StarRating'
import LazyImage from './LazyImage'
import { getAffiliateLink, affiliateLinkProps } from '../../utils/affiliateLink'
import { formatINR } from '../../utils/format'
import { useCompare } from '../../context/CompareContext'

/**
 * Affiliate product card with CTA and compare toggle.
 * @param {{ product: object, showCompare?: boolean, className?: string }} props
 */
export default function ProductCard({ product, showCompare = true, className }) {
  const { isInCompare, toggleCompare } = useCompare()
  if (!product) return null

  const inCompare = isInCompare(product.id)
  const affiliateUrl = getAffiliateLink(product.asin)

  return (
    <article
      className={clsx(
        'group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-amazon-orange/40 hover:shadow-card-hover',
        className,
      )}
    >
      {/* Image + badges */}
      <div className="relative">
        <a
          href={affiliateUrl}
          {...affiliateLinkProps}
          aria-label={`View ${product.name} on Amazon`}
        >
          <LazyImage
            src={product.image}
            alt={product.name}
            className="aspect-square w-full"
            imgClassName="transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {product.badge && (
          <div className="absolute left-2 top-2">
            <Badge label={product.badge} />
          </div>
        )}

        {product.discountPercent > 0 && (
          <div className="absolute right-2 top-2 rounded-full bg-price-sale px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
            -{product.discountPercent}%
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3.5">
        <p className="text-xs font-medium uppercase tracking-wide text-[#565959]">
          {product.brand}
        </p>

        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-[#111111]">
          <a href={affiliateUrl} {...affiliateLinkProps} className="hover:text-amazon-blue">
            {product.name}
          </a>
        </h3>

        <div className="mt-2">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        {/* Price */}
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-lg font-bold text-[#111111]">
            {formatINR(product.discountedPrice)}
          </span>
          {product.originalPrice > product.discountedPrice && (
            <span className="text-sm text-price-original line-through">
              {formatINR(product.originalPrice)}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="text-xs font-semibold text-price-savings">
              {product.discountPercent}% off
            </span>
          )}
        </div>

        <p className="mt-1.5 line-clamp-2 text-xs text-[#565959]">{product.summary}</p>

        {/* CTA */}
        <div className="mt-auto pt-3.5">
          <a
            href={affiliateUrl}
            {...affiliateLinkProps}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-amazon-orange px-3 py-2.5 text-sm font-bold text-amazon-dark transition hover:brightness-95 active:scale-[0.99]"
          >
            Check Price on Amazon
            <ExternalLink className="h-4 w-4" />
          </a>

          {showCompare && (
            <button
              type="button"
              onClick={() => toggleCompare(product.id)}
              className={clsx(
                'mt-2 flex w-full items-center justify-center gap-1.5 text-xs font-semibold transition',
                inCompare
                  ? 'text-price-savings'
                  : 'text-amazon-blue hover:text-amazon-dark',
              )}
            >
              {inCompare ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Added to Compare
                </>
              ) : (
                <>
                  <GitCompareArrows className="h-3.5 w-3.5" /> Add to Compare
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
