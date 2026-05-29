import { useEffect, useMemo, useState } from 'react'
import products from '../data/products'

/** Generic debounce hook. */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

/**
 * Search products by name, brand, tags and summary (debounced 300ms).
 * @param {string} query
 * @param {{ source?: object[], delay?: number }} [options]
 * @returns {{ results: object[], debouncedQuery: string, isSearching: boolean }}
 */
export function useSearch(query, { source = products, delay = 300 } = {}) {
  const debouncedQuery = useDebounce(query, delay)

  const results = useMemo(() => {
    const q = (debouncedQuery || '').trim().toLowerCase()
    if (!q) return []
    return source.filter((p) => {
      const haystack = [
        p.name,
        p.brand,
        p.subcategory,
        p.summary,
        ...(p.tags || []),
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [debouncedQuery, source])

  return {
    results,
    debouncedQuery,
    isSearching: query !== debouncedQuery,
  }
}

export default useSearch
