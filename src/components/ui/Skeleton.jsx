import clsx from 'clsx'

export function Skeleton({ className }) {
  return <div className={clsx('skeleton rounded-md', className)} aria-hidden="true" />
}

/** Animated placeholder that mirrors the ProductCard layout. */
export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <Skeleton className="mt-3 h-3 w-1/3" />
      <Skeleton className="mt-2 h-4 w-full" />
      <Skeleton className="mt-1 h-4 w-2/3" />
      <Skeleton className="mt-3 h-3 w-1/2" />
      <Skeleton className="mt-4 h-9 w-full rounded-lg" />
    </div>
  )
}

export function ProductGridSkeleton({ count = 6, className }) {
  return (
    <div
      className={clsx(
        'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default Skeleton
