import { Routes, Route } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { CompareProvider } from './context/CompareContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import BackToTop from './components/layout/BackToTop'
import MobileNav from './components/layout/MobileNav'

import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductReviewPage from './pages/ProductReviewPage'
import ReviewsListPage from './pages/ReviewsListPage'
import BuyingGuidePage from './pages/BuyingGuidePage'
import GuidesListPage from './pages/GuidesListPage'
import DealsPage from './pages/DealsPage'
import ComparePage from './pages/ComparePage'
import SearchResultsPage from './pages/SearchResultsPage'
import AboutPage from './pages/AboutPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <ToastProvider>
      <CompareProvider>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Header />

          {/* pb-16 leaves room for the mobile bottom nav */}
          <main className="flex-1 pb-16 sm:pb-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/review/:slug" element={<ProductReviewPage />} />
              <Route path="/reviews" element={<ReviewsListPage />} />
              <Route path="/guide/:slug" element={<BuyingGuidePage />} />
              <Route path="/guides" element={<GuidesListPage />} />
              <Route path="/deals" element={<DealsPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>

        <BackToTop />
        <MobileNav />
      </CompareProvider>
    </ToastProvider>
  )
}
