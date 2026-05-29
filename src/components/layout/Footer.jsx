import { Link } from 'react-router-dom'
import { Link2 } from 'lucide-react'
import categories from '../../data/categories'
import NewsletterBanner from '../ui/NewsletterBanner'

const QUICK_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/deals', label: 'Today’s Deals' },
  { to: '/reviews', label: 'Expert Reviews' },
  { to: '/guides', label: 'Buying Guides' },
  { to: '/compare', label: 'Compare Products' },
  { to: '/privacy', label: 'Privacy Policy' },
]

// Local brand SVGs (lucide deprecated its brand icons, so we ship our own).
const iconProps = { className: 'h-4 w-4', viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true }

const XIcon = () => (
  <svg {...iconProps}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
)

const InstagramIcon = () => (
  <svg {...iconProps}>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 2.76a5.46 5.46 0 1 1 0 10.92 5.46 5.46 0 0 1 0-10.92Zm0 9a3.54 3.54 0 1 0 0-7.08 3.54 3.54 0 0 0 0 7.08Zm6.95-9.22a1.28 1.28 0 1 1-2.55 0 1.28 1.28 0 0 1 2.55 0Z" />
  </svg>
)

const TelegramIcon = () => (
  <svg {...iconProps}>
    <path d="M21.94 4.6 18.6 20.36c-.25 1.1-.9 1.38-1.83.86l-5.05-3.72-2.44 2.35c-.27.27-.5.5-1.02.5l.36-5.13 9.34-8.44c.4-.36-.09-.56-.63-.2L5.78 13.2.81 11.65c-1.08-.34-1.1-1.08.22-1.6l19.31-7.44c.9-.34 1.69.2 1.6 1.6Z" />
  </svg>
)

const SOCIALS = [
  { Icon: XIcon, label: 'Twitter / X', href: 'https://twitter.com' },
  { Icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com' },
  { Icon: TelegramIcon, label: 'Telegram', href: 'https://telegram.org' },
]

export default function Footer() {
  return (
    <footer className="bg-amazon-dark text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Col 1: brand */}
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amazon-orange">
              <Link2 className="h-5 w-5 text-amazon-dark" />
            </span>
            <span className="text-lg font-extrabold text-white">
              Amazon<span className="text-amazon-orange">Links</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-white/60">
            Find the Best. Buy with Confidence. Expert-curated Amazon products, reviews and
            deals — all in one place.
          </p>
          <div className="mt-4 flex gap-3">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-amazon-orange hover:text-amazon-dark"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: categories */}
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            Categories
          </h3>
          <ul className="space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/category/${cat.id}`}
                  className="text-white/60 transition hover:text-amazon-orange"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: quick links */}
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-white/60 transition hover:text-amazon-orange"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: newsletter */}
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            Stay in the Loop
          </h3>
          <p className="mb-3 text-sm text-white/60">
            The best Amazon deals, straight to your inbox.
          </p>
          <NewsletterBanner compact />
        </div>
      </div>

      {/* Bottom bar (extra bottom padding on mobile to clear the fixed bottom nav) */}
      <div className="border-t border-white/10 pb-16 sm:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-white/50">
          <p className="leading-relaxed">
            <span className="font-semibold text-white/70">Affiliate Disclaimer: </span>
            We earn commissions from qualifying purchases made through our links. This does
            not affect our editorial integrity, and there is no extra cost to you. As an
            Amazon Associate, AmazonLinks earns from qualifying purchases.
          </p>
          <p className="mt-3">© 2026 AmazonLinks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
