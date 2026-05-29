import { FlaskConical, ListChecks, ShieldCheck, Trophy } from 'lucide-react'
import Seo from '../components/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import AffiliateDisclaimer from '../components/ui/AffiliateDisclaimer'

const STEPS = [
  {
    Icon: FlaskConical,
    title: '1. We Research & Test',
    text: 'Our editors shortlist the most popular products in each category and put them through real-world testing — not just spec-sheet comparisons.',
  },
  {
    Icon: ListChecks,
    title: '2. We Score Objectively',
    text: 'Each product is scored on the criteria that matter — performance, value, build and reliability — so rankings reflect genuine merit.',
  },
  {
    Icon: Trophy,
    title: '3. We Recommend the Best',
    text: 'Only the products that earn it make our top picks. We update rankings as prices change and new products launch.',
  },
]

const TEAM = [
  { name: 'Aarav Mehta', role: 'Editor-in-Chief', seed: 'team-aarav' },
  { name: 'Priya Nair', role: 'Senior Reviewer · Electronics', seed: 'team-priya' },
  { name: 'Rahul Verma', role: 'Reviewer · Home & Fitness', seed: 'team-rahul' },
  { name: 'Sneha Iyer', role: 'Research & Data', seed: 'team-sneha' },
]

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      <Seo
        title="About Us"
        description="AmazonLinks helps you find the best Amazon products through expert, hands-on reviews and honest buying guides. Learn how we review."
        path="/about"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-amazon-blue to-amazon-dark">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <Breadcrumbs
            className="justify-center text-white/70 [&_a:hover]:text-amazon-orange [&_span]:text-white"
            items={[{ label: 'Home', to: '/' }, { label: 'About' }]}
          />
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            We help you buy with confidence.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
            AmazonLinks exists to cut through the noise of endless product listings. We test,
            compare and rank the best Amazon products so you can shop in minutes, not hours —
            and never overpay.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* Mission */}
        <section className="text-center">
          <h2 className="text-2xl font-extrabold text-[#111111]">Our Mission</h2>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-[#565959]">
            To be India’s most trusted product discovery platform — combining rigorous, honest
            reviews with a clean, fast shopping experience. We believe recommendations should
            be earned, not bought, and that transparency about how we make money is
            non-negotiable.
          </p>
        </section>

        {/* How we review */}
        <section className="mt-14">
          <h2 className="text-center text-2xl font-extrabold text-[#111111]">How We Review</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {STEPS.map(({ Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-card"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amazon-orange/10">
                  <Icon className="h-6 w-6 text-amazon-orange" />
                </div>
                <h3 className="mt-4 text-base font-bold text-[#111111]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#565959]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mt-14">
          <h2 className="text-center text-2xl font-extrabold text-[#111111]">Meet the Team</h2>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={`https://picsum.photos/seed/${member.seed}/160/160`}
                  alt={member.name}
                  loading="lazy"
                  className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-card"
                />
                <p className="mt-3 text-sm font-bold text-[#111111]">{member.name}</p>
                <p className="text-xs text-[#565959]">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Affiliate disclosure */}
        <section className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#111111]">
            <ShieldCheck className="h-6 w-6 text-amazon-orange" /> Affiliate Disclosure
          </h2>
          <AffiliateDisclaimer className="mt-4" />
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#565959]">
            <p>
              AmazonLinks is a participant in the Amazon Associates Programme, an affiliate
              advertising programme designed to provide a means for sites to earn advertising
              fees by advertising and linking to Amazon.in.
            </p>
            <p>
              When you click a link on our site and make a qualifying purchase, we may earn a
              small commission — at absolutely no extra cost to you. These commissions help us
              keep the lights on and continue producing independent reviews.
            </p>
            <p>
              Our editorial team operates independently of our commercial relationships. A
              commission never buys a better review, ranking or placement. Prices and
              availability shown on AmazonLinks are indicative and are accurate as of the time
              of publishing; always confirm the current price on Amazon before purchasing.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
