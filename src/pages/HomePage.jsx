import Seo from '../components/Seo'
import HeroSection from '../components/home/HeroSection'
import TrustBadges from '../components/home/TrustBadges'
import FeaturedDeals from '../components/home/FeaturedDeals'
import CategoryGrid from '../components/home/CategoryGrid'
import TopPicksSection from '../components/home/TopPicksSection'
import TrendingProducts from '../components/home/TrendingProducts'
import NewsletterBanner from '../components/ui/NewsletterBanner'
import AffiliateDisclaimer from '../components/ui/AffiliateDisclaimer'

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <Seo
        title="AmazonLinks — Find the Best. Buy with Confidence."
        description="Expert Amazon product reviews, honest buying guides and the best deals in India. Discover top-rated products and shop with confidence."
        path="/"
      />

      <HeroSection />
      <TrustBadges />

      <div className="mx-auto max-w-7xl px-4 pt-6">
        <AffiliateDisclaimer dismissible />
      </div>

      <FeaturedDeals />
      <CategoryGrid />
      <TopPicksSection />
      <TrendingProducts />
      <NewsletterBanner />
    </div>
  )
}
