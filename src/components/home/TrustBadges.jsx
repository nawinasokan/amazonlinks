import { Award, BadgeCheck, IndianRupee, ShieldCheck } from 'lucide-react'

const BADGES = [
  { Icon: BadgeCheck, label: 'Verified Reviews', sub: 'Tested by our editors' },
  { Icon: ShieldCheck, label: 'Secure Links', sub: 'Safe affiliate links' },
  { Icon: IndianRupee, label: 'Best Prices', sub: 'Updated daily' },
  { Icon: Award, label: 'Expert Picks', sub: 'Curated, not random' },
]

export default function TrustBadges() {
  return (
    <section className="border-y border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-gray-200 sm:grid-cols-4">
        {BADGES.map(({ Icon, label, sub }) => (
          <div
            key={label}
            className="flex items-center gap-3 bg-white px-4 py-5 sm:justify-center"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amazon-orange/10">
              <Icon className="h-5 w-5 text-amazon-orange" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#111111]">{label}</p>
              <p className="text-xs text-[#565959]">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
