import { Star, StarHalf } from 'lucide-react'
import clsx from 'clsx'
import { formatCount } from '../../utils/format'

const SIZES = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

/**
 * Visual star rating.
 * @param {{ rating: number, reviewCount?: number, size?: 'sm'|'md'|'lg', showCount?: boolean, showValue?: boolean, className?: string }} props
 */
export default function StarRating({
  rating = 0,
  reviewCount,
  size = 'sm',
  showCount = true,
  showValue = true,
  className,
}) {
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.5
  const empty = 5 - full - (hasHalf ? 1 : 0)
  const dim = SIZES[size] || SIZES.sm

  return (
    <div className={clsx('flex items-center gap-1.5', className)}>
      <span
        className="flex items-center"
        aria-label={`Rated ${rating} out of 5`}
        role="img"
      >
        {Array.from({ length: full }).map((_, i) => (
          <Star key={`f${i}`} className={clsx(dim, 'fill-star text-star')} />
        ))}
        {hasHalf && (
          <StarHalf className={clsx(dim, 'fill-star text-star')} />
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <Star key={`e${i}`} className={clsx(dim, 'text-gray-300')} />
        ))}
      </span>

      {showValue && (
        <span className="text-xs font-semibold text-[#111111]">
          {rating.toFixed(1)}
        </span>
      )}
      {showCount && reviewCount != null && (
        <span className="text-xs text-[#565959]">
          ({formatCount(reviewCount)})
        </span>
      )}
    </div>
  )
}
