import { useState } from 'react'
import { CheckCircle2, Mail, Send } from 'lucide-react'
import clsx from 'clsx'

const STORAGE_KEY = 'amazonlinks_newsletter'

/**
 * Newsletter signup. Stores the email in localStorage (mock).
 * @param {{ compact?: boolean, className?: string }} props
 */
export default function NewsletterBanner({ compact = false, className }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!valid) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      if (!existing.includes(email)) existing.push(email)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
    } catch {
      /* ignore */
    }
    setSubmitted(true)
    setEmail('')
  }

  // Compact variant used in the footer column.
  if (compact) {
    return (
      <div className={className}>
        {submitted ? (
          <p className="flex items-center gap-2 text-sm text-green-400">
            <CheckCircle2 className="h-4 w-4" /> You’re subscribed!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex overflow-hidden rounded-lg bg-white/10 ring-1 ring-white/15 focus-within:ring-amazon-orange">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Email address"
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-white/50 outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex items-center bg-amazon-orange px-3 text-amazon-dark transition hover:brightness-95"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
          </form>
        )}
      </div>
    )
  }

  return (
    <section
      className={clsx(
        'relative overflow-hidden bg-gradient-to-br from-amazon-blue to-amazon-dark',
        className,
      )}
    >
      <div className="mx-auto max-w-3xl px-4 py-14 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amazon-orange/20">
          <Mail className="h-6 w-6 text-amazon-orange" />
        </div>
        <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
          Get the Best Amazon Deals in Your Inbox
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/70">
          Join 50,000+ smart shoppers. We send only the deals worth your time — handpicked
          by our editors.
        </p>

        {submitted ? (
          <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-4 text-white">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <span className="font-semibold">Thanks for subscribing! Deals incoming.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              aria-label="Email address"
              className="w-full rounded-lg border border-transparent bg-white px-4 py-3 text-sm text-[#111111] outline-none focus:border-amazon-orange"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-amazon-orange px-6 py-3 text-sm font-bold text-amazon-dark transition hover:brightness-95 active:scale-[0.99]"
            >
              Subscribe <Send className="h-4 w-4" />
            </button>
          </form>
        )}

        {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
        <p className="mt-3 text-xs text-white/50">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
