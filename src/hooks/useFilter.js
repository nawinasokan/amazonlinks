import { useMemo } from 'react'

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
]

/**
 * Filter + sort a list of products.
 * @param {object[]} products
 * @param {{
 *   subcategory?: string,
 *   priceRange?: [number, number],
 *   minRating?: number,
 *   brands?: string[],
 *   search?: string,
 * }} [filters]
 * @param {string} [sort] one of SORT_OPTIONS values
 */
export function useFilter(products, filters = {}, sort = 'featured') {
  const { subcategory, priceRange, minRating, brands, search } = filters

  return useMemo(() => {
    let result = products.filter((p) => {
      if (subcategory && p.subcategory !== subcategory) return false
      if (priceRange) {
        const [min, max] = priceRange
        if (p.discountedPrice < min || p.discountedPrice > max) return false
      }
      if (minRating && p.rating < minRating) return false
      if (brands && brands.length && !brands.includes(p.brand)) return false
      if (search) {
        const q = search.trim().toLowerCase()
        const haystack = [p.name, p.brand, p.summary, ...(p.tags || [])]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })

    const byFeatured = (a, b) =>
      (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.rating - a.rating

    switch (sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.discountedPrice - b.discountedPrice)
        break
      case 'price-desc':
        result = [...result].sort((a, b) => b.discountedPrice - a.discountedPrice)
        break
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case 'featured':
      default:
        result = [...result].sort(byFeatured)
    }

    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, subcategory, priceRange?.[0], priceRange?.[1], minRating, brands, search, sort])
}

export default useFilter
