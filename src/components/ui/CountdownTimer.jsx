import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import clsx from 'clsx'
import { getTimeRemaining, pad } from '../../utils/format'

/**
 * Live countdown that ticks every second.
 * @param {{ expiresAt: string, compact?: boolean, className?: string }} props
 */
export default function CountdownTimer({ expiresAt, compact = false, className }) {
  const [remaining, setRemaining] = useState(() => getTimeRemaining(expiresAt))

  useEffect(() => {
    setRemaining(getTimeRemaining(expiresAt))
    const id = setInterval(() => {
      setRemaining(getTimeRemaining(expiresAt))
    }, 1000)
    return () => clearInterval(id)
  }, [expiresAt])

  if (!remaining) {
    return (
      <span
        className={clsx(
          'inline-flex items-center gap-1 text-xs font-semibold text-[#565959]',
          className,
        )}
      >
        <Clock className="h-3.5 w-3.5" /> Deal ended
      </span>
    )
  }

  const { days, hours, minutes, seconds } = remaining

  if (compact) {
    return (
      <span
        className={clsx(
          'inline-flex items-center gap-1 text-xs font-bold text-price-sale',
          className,
        )}
      >
        <Clock className="h-3.5 w-3.5" />
        {days > 0 && `${days}d `}
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </span>
    )
  }

  const units = [
    { label: 'Days', value: days },
    { label: 'Hrs', value: hours },
    { label: 'Min', value: minutes },
    { label: 'Sec', value: seconds },
  ]

  return (
    <div className={clsx('flex items-center gap-1.5', className)}>
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-1.5">
          <div className="flex flex-col items-center">
            <span className="min-w-[2rem] rounded-md bg-amazon-dark px-1.5 py-1 text-center text-sm font-bold tabular-nums text-white">
              {pad(u.value)}
            </span>
            <span className="mt-0.5 text-[10px] font-medium uppercase text-[#565959]">
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="pb-3 font-bold text-amazon-dark">:</span>
          )}
        </div>
      ))}
    </div>
  )
}
