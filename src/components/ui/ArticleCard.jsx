import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import LazyImage from './LazyImage'
import { getCategoryById } from '../../data/categories'
import { formatDate } from '../../utils/format'

/**
 * Card for an editorial review or buying guide.
 * @param {{ article: object, to: string, kind?: 'Review'|'Guide' }} props
 */
export default function ArticleCard({ article, to, kind = 'Review' }) {
  if (!article) return null
  const category = getCategoryById(article.category)

  return (
    <Link
      to={to}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative">
        <LazyImage src={article.heroImage} alt={article.title} className="aspect-[16/9] w-full" />
        <span className="absolute left-3 top-3 rounded-full bg-amazon-dark/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          {kind}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {category && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amazon-blue">
            <category.icon className="h-3.5 w-3.5" strokeWidth={1.75} /> {category.label}
          </span>
        )}
        <h3 className="mt-1.5 line-clamp-2 text-base font-bold leading-snug text-[#111111] group-hover:text-amazon-blue">
          {article.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-[#565959]">{article.summary}</p>

        <div className="mt-auto flex items-center justify-between pt-4 text-xs text-[#565959]">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {article.readingTime} min read
          </span>
          <span className="flex items-center gap-1 font-semibold text-amazon-blue">
            Read more
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
