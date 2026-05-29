// Formatting helpers shared across the app.

/** Format a number as Indian Rupees, e.g. 1499 -> "₹1,499" */
export function formatINR(value) {
  if (value == null || Number.isNaN(value)) return '—'
  return `₹${Number(value).toLocaleString('en-IN')}`
}

/** Compact a large review count, e.g. 124500 -> "1,24,500" (Indian grouping) */
export function formatCount(value) {
  if (value == null) return '0'
  return Number(value).toLocaleString('en-IN')
}

/** Human-friendly date, e.g. "2026-05-01" -> "1 May 2026" */
export function formatDate(isoDate) {
  if (!isoDate) return ''
  const d = new Date(isoDate)
  if (Number.isNaN(d.getTime())) return isoDate
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Money saved between two prices, formatted as INR. */
export function savingsAmount(originalPrice, discountedPrice) {
  return formatINR(Math.max(0, (originalPrice || 0) - (discountedPrice || 0)))
}

/**
 * Return the remaining time to a target ISO date as a parts object,
 * or null once the target has passed.
 */
export function getTimeRemaining(targetIso, now = Date.now()) {
  const total = new Date(targetIso).getTime() - now
  if (Number.isNaN(total) || total <= 0) return null
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  return { total, days, hours, minutes, seconds }
}

/** Pad a number to two digits for countdown displays. */
export const pad = (n) => String(n).padStart(2, '0')
