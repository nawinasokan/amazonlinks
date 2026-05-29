import clsx from 'clsx'
import { Award, Crown, Flame, Sparkles } from 'lucide-react'

const STYLES = {
  'Best Seller': {
    className: 'bg-amazon-orange text-amazon-dark',
    Icon: Flame,
  },
  "Editor's Choice": {
    className: 'bg-amazon-blue text-white',
    Icon: Sparkles,
  },
  '#1 Pick': {
    className: 'bg-price-savings text-white',
    Icon: Crown,
  },
  default: {
    className: 'bg-gray-800 text-white',
    Icon: Award,
  },
}

/**
 * Coloured label/ribbon for product badges.
 * @param {{ label: string, size?: 'sm'|'md', withIcon?: boolean, className?: string }} props
 */
export default function Badge({ label, size = 'sm', withIcon = true, className }) {
  if (!label) return null
  const { className: tone, Icon } = STYLES[label] || STYLES.default
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full font-bold uppercase tracking-wide shadow-sm',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs',
        tone,
        className,
      )}
    >
      {withIcon && Icon && <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />}
      {label}
    </span>
  )
}
