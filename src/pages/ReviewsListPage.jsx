import { useState } from 'react'
import { Newspaper } from 'lucide-react'
import clsx from 'clsx'
import Seo from '../components/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import ArticleCard from '../components/ui/ArticleCard'
import reviews from '../data/reviews'
import { getCategoryById } from '../data/categories'

export default function ReviewsListPage() {
  const cats = [...new Set(reviews.map((r) => r.category))]
  const [active, setActive] = useState('all')

  const visible = active === 'all' ? reviews : reviews.filter((r) => r.category === active)

  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-6">
      <Seo
        title="Expert Reviews"
        description="In-depth, hands-on Amazon product reviews from the AmazonLinks editorial team — tested, scored and ranked."
        path="/reviews"
      />

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Reviews' }]} />

      <div className="mt-4">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold text-[#111111] sm:text-3xl">
          <Newspaper className="h-7 w-7 text-amazon-orange" /> Expert Reviews
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#565959]">
          We buy, test and rank products so you don’t have to. Honest, hands-on reviews with
          clear verdicts.
        </p>
      </div>

      {/* Category filter */}
      <div className="mt-6 mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive('all')}
          className={clsx(
            'rounded-full px-4 py-2 text-sm font-semibold transition',
            active === 'all'
              ? 'bg-amazon-dark text-white'
              : 'bg-white text-[#565959] ring-1 ring-gray-200 hover:ring-amazon-orange',
          )}
        >
          All
        </button>
        {cats.map((id) => {
          const cat = getCategoryById(id)
          if (!cat) return null
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={clsx(
                'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition',
                active === id
                  ? 'bg-amazon-dark text-white'
                  : 'bg-white text-[#565959] ring-1 ring-gray-200 hover:ring-amazon-orange',
              )}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((r) => (
          <ArticleCard key={r.id} article={r} to={`/review/${r.slug}`} kind="Review" />
        ))}
      </div>
    </div>
  )
}
