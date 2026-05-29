import { Star } from 'lucide-react'
import clsx from 'clsx'
import { formatINR } from '../../utils/format'

const RATING_OPTIONS = [4.5, 4, 3.5]

/**
 * Controlled filter panel (used in the desktop sidebar and the mobile drawer).
 *
 * @param {{
 *   value: { subcategory?: string, priceRange?: [number, number], minRating?: number, brands?: string[] },
 *   onChange: (next) => void,
 *   subcategories?: string[],
 *   brands?: string[],
 *   priceBounds?: { min: number, max: number },
 *   onReset?: () => void,
 * }} props
 */
export default function FilterPanel({
  value,
  onChange,
  subcategories = [],
  brands = [],
  priceBounds = { min: 0, max: 60000 },
  onReset,
}) {
  const { subcategory, priceRange, minRating, brands: selectedBrands = [] } = value
  const maxPrice = priceRange?.[1] ?? priceBounds.max

  const set = (patch) => onChange({ ...value, ...patch })

  const toggleBrand = (brand) => {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand]
    set({ brands: next })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wide text-[#111111]">Filters</h3>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-amazon-blue hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Subcategory */}
      {subcategories.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#565959]">
            Subcategory
          </h4>
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => set({ subcategory: undefined })}
              className={clsx(
                'block w-full text-left text-sm transition',
                !subcategory ? 'font-semibold text-amazon-blue' : 'text-[#111111] hover:text-amazon-blue',
              )}
            >
              All
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => set({ subcategory: sub })}
                className={clsx(
                  'block w-full text-left text-sm transition',
                  subcategory === sub
                    ? 'font-semibold text-amazon-blue'
                    : 'text-[#111111] hover:text-amazon-blue',
                )}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price range */}
      <div>
        <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#565959]">
          Price
        </h4>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          step={100}
          value={maxPrice}
          onChange={(e) =>
            set({ priceRange: [priceBounds.min, Number(e.target.value)] })
          }
          className="w-full accent-amazon-orange"
          aria-label="Maximum price"
        />
        <div className="mt-1 flex justify-between text-xs text-[#565959]">
          <span>{formatINR(priceBounds.min)}</span>
          <span className="font-semibold text-[#111111]">
            Up to {formatINR(maxPrice)}
          </span>
        </div>
      </div>

      {/* Min rating */}
      <div>
        <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#565959]">
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {RATING_OPTIONS.map((r) => (
            <label
              key={r}
              className="flex cursor-pointer items-center gap-2 text-sm text-[#111111]"
            >
              <input
                type="radio"
                name="minRating"
                checked={minRating === r}
                onChange={() => set({ minRating: r })}
                className="accent-amazon-orange"
              />
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-star text-star" />
                {r} &amp; up
              </span>
            </label>
          ))}
          <label className="flex cursor-pointer items-center gap-2 text-sm text-[#111111]">
            <input
              type="radio"
              name="minRating"
              checked={!minRating}
              onChange={() => set({ minRating: undefined })}
              className="accent-amazon-orange"
            />
            Any rating
          </label>
        </div>
      </div>

      {/* Brands */}
      {brands.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#565959]">
            Brand
          </h4>
          <div className="max-h-48 space-y-1.5 overflow-y-auto pr-1">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-2 text-sm text-[#111111]"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="accent-amazon-orange"
                />
                {brand}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
