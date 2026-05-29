import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import Seo from '../components/Seo'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <Seo title="Page Not Found" noindex />
      <p className="text-6xl font-extrabold text-amazon-orange">404</p>
      <h1 className="mt-4 text-2xl font-extrabold text-[#111111]">Page not found</h1>
      <p className="mt-2 text-sm text-[#565959]">
        The page you’re looking for doesn’t exist or has moved. Let’s get you back on track.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-amazon-orange px-5 py-3 text-sm font-bold text-amazon-dark transition hover:brightness-95"
      >
        <Home className="h-4 w-4" /> Back to Home
      </Link>
    </div>
  )
}
