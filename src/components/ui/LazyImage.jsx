import { useState } from 'react'
import clsx from 'clsx'

/**
 * Image with native lazy loading + a shimmer placeholder until it loads.
 * @param {{ src: string, alt: string, className?: string, imgClassName?: string }} props
 */
export default function LazyImage({ src, alt, className, imgClassName }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className={clsx('relative overflow-hidden bg-gray-100', className)}>
      {!loaded && !failed && (
        <div className="skeleton absolute inset-0" aria-hidden="true" />
      )}
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-[#565959]">
          Image unavailable
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={clsx(
            'h-full w-full object-cover transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}
    </div>
  )
}
