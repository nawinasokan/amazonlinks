import { useMemo } from 'react'
import { Crown, ExternalLink } from 'lucide-react'
import clsx from 'clsx'
import StarRating from './StarRating'
import LazyImage from './LazyImage'
import { getAffiliateLink, affiliateLinkProps } from '../../utils/affiliateLink'
import { formatINR, formatCount } from '../../utils/format'

/**
 * Side-by-side product comparison table.
 * - Sticky first column (feature names)
 * - Horizontal scroll on mobile
 * - Highlights a "Best Pick" column (explicit `highlightId` or best value/price ratio)
 *
 * @param {{ products: object[], highlightId?: string, showBuy?: boolean }} props
 */
export default function ComparisonTable({ products = [], highlightId, showBuy = true }) {
  const bestId = useMemo(() => {
    if (highlightId) return highlightId
    if (!products.length) return null
    // Best value = highest rating-to-price ratio.
    return products.reduce((best, p) =>
      p.rating / p.discountedPrice > best.rating / best.discountedPrice ? p : best,
    ).id
  }, [products, highlightId])

  if (!products.length) return null

  const isBest = (p) => p.id === bestId

  const rows = [
    {
      label: 'Rating',
      render: (p) => (
        <StarRating rating={p.rating} showCount={false} size="sm" className="justify-center" />
      ),
    },
    {
      label: 'Reviews',
      render: (p) => (
        <span className="text-[#565959]">{formatCount(p.reviewCount)}</span>
      ),
    },
    {
      label: 'Price',
      render: (p) => (
        <div className="flex flex-col items-center">
          <span className="font-bold text-[#111111]">{formatINR(p.discountedPrice)}</span>
          {p.originalPrice > p.discountedPrice && (
            <span className="text-xs text-price-original line-through">
              {formatINR(p.originalPrice)}
            </span>
          )}
        </div>
      ),
    },
    {
      label: 'Discount',
      render: (p) =>
        p.discountPercent > 0 ? (
          <span className="font-semibold text-price-savings">{p.discountPercent}% off</span>
        ) : (
          <span className="text-[#565959]">—</span>
        ),
    },
    {
      label: 'Type',
      render: (p) => <span className="text-[#565959]">{p.subcategory}</span>,
    },
    {
      label: 'Key highlight',
      render: (p) => <span className="text-[#111111]">{p.pros?.[0] || '—'}</span>,
    },
  ]

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-card">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 w-32 border-b border-gray-200 bg-gray-50 p-3 text-left text-xs font-semibold uppercase tracking-wide text-[#565959]">
              Compare
            </th>
            {products.map((p) => (
              <th
                key={p.id}
                className={clsx(
                  'border-b border-gray-200 p-3 align-top',
                  isBest(p) && 'bg-amazon-orange/10',
                )}
              >
                <div className="flex flex-col items-center gap-2">
                  {isBest(p) && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amazon-orange px-2 py-0.5 text-[10px] font-bold uppercase text-amazon-dark">
                      <Crown className="h-3 w-3" /> Best Pick
                    </span>
                  )}
                  <a href={getAffiliateLink(p.asin)} {...affiliateLinkProps}>
                    <LazyImage
                      src={p.image}
                      alt={p.name}
                      className="h-20 w-20 rounded-lg"
                    />
                  </a>
                  <p className="text-xs font-medium text-[#565959]">{p.brand}</p>
                  <p className="line-clamp-2 text-center text-xs font-semibold text-[#111111]">
                    {p.name}
                  </p>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="even:bg-gray-50/50">
              <td className="sticky left-0 z-10 border-b border-gray-100 bg-white p-3 text-left text-xs font-semibold text-[#565959]">
                {row.label}
              </td>
              {products.map((p) => (
                <td
                  key={p.id}
                  className={clsx(
                    'border-b border-gray-100 p-3 text-center',
                    isBest(p) && 'bg-amazon-orange/[0.06]',
                  )}
                >
                  {row.render(p)}
                </td>
              ))}
            </tr>
          ))}

          {showBuy && (
            <tr>
              <td className="sticky left-0 z-10 bg-white p-3" />
              {products.map((p) => (
                <td
                  key={p.id}
                  className={clsx('p-3 text-center', isBest(p) && 'bg-amazon-orange/[0.06]')}
                >
                  <a
                    href={getAffiliateLink(p.asin)}
                    {...affiliateLinkProps}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-amazon-orange px-3 py-2 text-xs font-bold text-amazon-dark transition hover:brightness-95"
                  >
                    Buy
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
