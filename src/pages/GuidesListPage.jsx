import { BookOpen } from 'lucide-react'
import Seo from '../components/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import ArticleCard from '../components/ui/ArticleCard'
import guides from '../data/guides'

export default function GuidesListPage() {
  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-6">
      <Seo
        title="Buying Guides"
        description="Structured, no-nonsense Amazon buying guides — learn what actually matters before you buy, with expert-scored recommendations."
        path="/guides"
      />

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Buying Guides' }]} />

      <div className="mt-4">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold text-[#111111] sm:text-3xl">
          <BookOpen className="h-7 w-7 text-amazon-orange" /> Buying Guides
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#565959]">
          Know exactly what to look for before you buy. Each guide breaks down the specs that
          matter and our top expert-scored picks.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <ArticleCard key={g.id} article={g} to={`/guide/${g.slug}`} kind="Guide" />
        ))}
      </div>
    </div>
  )
}
