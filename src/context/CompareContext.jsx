import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useToast } from './ToastContext'
import { getProductById } from '../data/products'

const CompareContext = createContext(null)
const STORAGE_KEY = 'amazonlinks_compare'
export const MAX_COMPARE = 4

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.slice(0, MAX_COMPARE) : []
  } catch {
    return []
  }
}

export function CompareProvider({ children }) {
  const { showToast } = useToast()
  const [ids, setIds] = useState(loadInitial)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [ids])

  const isInCompare = useCallback((id) => ids.includes(id), [ids])

  const addToCompare = useCallback(
    (id) => {
      // `ids` is current here because this callback is recreated when it changes.
      if (ids.includes(id)) return
      if (ids.length >= MAX_COMPARE) {
        showToast(`You can compare up to ${MAX_COMPARE} products`, 'info')
        return
      }
      setIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
      const product = getProductById(id)
      showToast(`Added “${product?.brand || 'Product'}” to compare`, 'success')
    },
    [ids, showToast],
  )

  const removeFromCompare = useCallback((id) => {
    setIds((prev) => prev.filter((x) => x !== id))
  }, [])

  const toggleCompare = useCallback(
    (id) => {
      if (ids.includes(id)) removeFromCompare(id)
      else addToCompare(id)
    },
    [ids, addToCompare, removeFromCompare],
  )

  const clearCompare = useCallback(() => setIds([]), [])

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      isInCompare,
      addToCompare,
      removeFromCompare,
      toggleCompare,
      clearCompare,
      max: MAX_COMPARE,
      isFull: ids.length >= MAX_COMPARE,
    }),
    [ids, isInCompare, addToCompare, removeFromCompare, toggleCompare, clearCompare],
  )

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used within a CompareProvider')
  return ctx
}

export default CompareContext
