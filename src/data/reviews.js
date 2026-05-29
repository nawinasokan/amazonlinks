// Editorial reviews for AmazonLinks.
// Each review renders dynamically from its `sections` array on ProductReviewPage.
// section.type: 'intro' | 'comparison_table' | 'review' | 'buying_guide' | 'faq'

const hero = (seed) => `https://picsum.photos/seed/${seed}/1200/600`

export const reviews = [
  {
    id: 'rev_001',
    slug: 'best-budget-bluetooth-headphones-india-2026',
    title: 'Best Budget Bluetooth Headphones in India (2026)',
    category: 'electronics',
    publishedDate: '2026-05-01',
    author: 'AmazonLinks Editorial Team',
    readingTime: 9,
    summary:
      'We tested 12 wireless headphones under ₹4,000 over six weeks — judging sound, battery, comfort and call quality. These three came out on top.',
    heroImage: hero('reviewheadphones'),
    topPick: 'prod_002',
    sections: [
      {
        type: 'intro',
        content:
          'Wireless headphones under ₹4,000 have never been better. But the gap between a great pair and a forgettable one is wider than the spec sheet suggests. Over six weeks we lived with 12 popular models — commuting, working from home and taking calls — and scored each on sound signature, battery life, comfort and microphone clarity. Below are the three we kept reaching for, plus a quick buying guide so you can match a pair to how you actually listen.',
      },
      {
        type: 'comparison_table',
        heading: 'At a glance: our top 3',
        productIds: ['prod_002', 'prod_003', 'prod_001'],
      },
      {
        type: 'review',
        productId: 'prod_002',
        verdict: 'Best Overall',
        score: 9.2,
        content:
          'The Sony WH-CH520 is the pair we recommend to most people. Its 50-hour battery genuinely lasts a working week, the companion app lets you tune the sound from bass-forward to neutral, and multipoint means it juggles your laptop and phone without fuss. Build is plasticky, but at this price the trade-off is easy to forgive.',
      },
      {
        type: 'review',
        productId: 'prod_003',
        verdict: 'Best for Bass',
        score: 8.7,
        content:
          'If you want that thumping low end without paying more, the JBL Tune 510BT delivers. Pure Bass tuning is fun for pop and EDM, the 40-hour battery is excellent, and USB-C fast charging tops you up in minutes. The clamping force runs tight for larger heads, so try before long sessions.',
      },
      {
        type: 'review',
        productId: 'prod_001',
        verdict: 'Best Value',
        score: 8.4,
        content:
          'The boAt Rockerz 450 remains the value king under ₹1,500. Bass-heavy, lightweight and frequently on deal, it is the easiest no-regret pick for a first wireless pair. Call quality is its weak spot, so heavy callers should step up to the Sony.',
      },
      {
        type: 'buying_guide',
        heading: 'How to choose',
        content:
          'Start with battery: anything above 30 hours means you charge weekly, not daily. For calls, look for a model with multiple mics and read real-world reviews — spec sheets rarely tell the truth here. Comfort comes down to clamp force and ear-cup padding, so on-ear pairs suit short sessions while over-ear designs win for marathons. Finally, an app with EQ control lets you reshape sound you would otherwise be stuck with.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Are budget Bluetooth headphones good enough for calls?',
            a: 'For occasional calls, yes. For daily meetings, prioritise models with multipoint and multiple microphones — the Sony WH-CH520 is the safest pick of this trio.',
          },
          {
            q: 'On-ear or over-ear under ₹4,000?',
            a: 'Over-ear pairs are more comfortable for long listening, while on-ear designs are lighter and more portable. All three picks here are on-ear.',
          },
          {
            q: 'Do these support fast charging?',
            a: 'The JBL Tune 510BT and Sony WH-CH520 both charge over USB-C, with a few minutes giving you hours of playback.',
          },
        ],
      },
    ],
  },

  {
    id: 'rev_002',
    slug: 'best-self-help-books-to-read-2026',
    title: 'Best Self-Help & Personal Finance Books to Read in 2026',
    category: 'books',
    publishedDate: '2026-04-18',
    author: 'AmazonLinks Editorial Team',
    readingTime: 7,
    summary:
      'Three books that actually changed how our team thinks about habits, money and a meaningful life — and why each is worth your time.',
    heroImage: hero('reviewbooks'),
    topPick: 'prod_012',
    sections: [
      {
        type: 'intro',
        content:
          'The self-help shelf is crowded with repackaged common sense. These three are the rare exceptions — books our team genuinely returns to. They are short, practical and, importantly, cheap right now. Here is what each gets right and who it is for.',
      },
      {
        type: 'comparison_table',
        heading: 'Compare the three',
        productIds: ['prod_012', 'prod_014', 'prod_013'],
      },
      {
        type: 'review',
        productId: 'prod_012',
        verdict: 'Best Overall',
        score: 9.5,
        content:
          'Atomic Habits is the most actionable book on this list. James Clear breaks behaviour change into four simple laws and backs each with research and memorable examples. If you read one book on building good routines, make it this one.',
      },
      {
        type: 'review',
        productId: 'prod_014',
        verdict: 'Best on Money',
        score: 9.3,
        content:
          'The Psychology of Money reframes wealth as behaviour, not maths. Across 19 short stories, Morgan Housel shows why temperament beats intelligence with investing. It will not tell you which fund to buy — it will make you a calmer, wiser saver.',
      },
      {
        type: 'review',
        productId: 'prod_013',
        verdict: 'Best Easy Read',
        score: 8.6,
        content:
          'Ikigai is the gentlest book here — a calming look at purpose and longevity drawn from Japan’s Okinawa region. It is light on step-by-step advice but high on perspective, perfect for a weekend reset.',
      },
      {
        type: 'buying_guide',
        heading: 'Paperback, hardcover or Kindle?',
        content:
          'Paperbacks are the best value for these titles and travel well. Choose hardcover only if you want a lasting copy of Ikigai, which has an especially nice edition. If you highlight heavily, the Kindle versions sync notes across devices — but you lose the lend-to-a-friend factor that makes these worth owning in print.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Which should I read first?',
            a: 'Start with Atomic Habits — its framework makes the lessons in the other two easier to actually apply.',
          },
          {
            q: 'Are these good for beginners to personal finance?',
            a: 'The Psychology of Money is ideal — it focuses on mindset over jargon, so no prior knowledge is needed.',
          },
        ],
      },
    ],
  },

  {
    id: 'rev_003',
    slug: 'best-kitchen-essentials-under-2500',
    title: 'Kitchen Essentials Under ₹2,500 That Are Actually Worth It',
    category: 'home-kitchen',
    publishedDate: '2026-03-29',
    author: 'AmazonLinks Editorial Team',
    readingTime: 6,
    summary:
      'Setting up a kitchen on a budget? These three workhorses earn their place on the counter — tested across months of daily cooking.',
    heroImage: hero('reviewkitchen'),
    topPick: 'prod_009',
    sections: [
      {
        type: 'intro',
        content:
          'You do not need to spend a fortune to cook well. After months of daily use, three affordable products stood out for reliability and value. Here is how they performed and what to look for when buying your own.',
      },
      {
        type: 'comparison_table',
        heading: 'The shortlist',
        productIds: ['prod_009', 'prod_010', 'prod_011'],
      },
      {
        type: 'review',
        productId: 'prod_009',
        verdict: 'Best Overall',
        score: 9.0,
        content:
          'The Prestige IRIS induction cooktop is the single most-used appliance in our test kitchen. Heating is quick and even, the controls are foolproof, and it sips power compared with a gas burner for everyday tasks. The cord is a touch short, so plan your socket placement.',
      },
      {
        type: 'review',
        productId: 'prod_010',
        verdict: 'Best Flask',
        score: 8.8,
        content:
          'Milton’s Thermosteel flask keeps water genuinely hot or cold for the full day. The flip lid is leak-proof and the steel build shrugs off knocks. Only gripe: the narrow mouth makes deep cleaning fiddly.',
      },
      {
        type: 'review',
        productId: 'prod_011',
        verdict: 'Best Starter Set',
        score: 8.2,
        content:
          'The Pigeon non-stick trio is the ideal first cookware set — light, induction-ready and genuinely non-stick if you treat it gently. Use wooden or silicone utensils and it will last; metal spatulas will not be kind to the coating.',
      },
      {
        type: 'buying_guide',
        heading: 'What to prioritise',
        content:
          'For appliances, match wattage to your needs — 1200W induction is plenty for two people. For cookware, induction-compatible bases future-proof your kitchen even if you cook on gas today. And with steel flasks, double-wall vacuum insulation is the spec that actually matters for all-day temperature retention.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Is induction cheaper to run than gas?',
            a: 'For quick, everyday cooking induction is very efficient and often cheaper. For long simmering, gas can still have the edge.',
          },
          {
            q: 'Will the non-stick coating last?',
            a: 'Yes, if you use soft utensils, avoid high dry heat and hand-wash gently. Treated well, a budget set lasts a couple of years.',
          },
        ],
      },
    ],
  },

  {
    id: 'rev_004',
    slug: 'best-home-workout-gear-2026',
    title: 'Best Home Workout Gear for Beginners (2026)',
    category: 'sports-fitness',
    publishedDate: '2026-05-12',
    author: 'AmazonLinks Editorial Team',
    readingTime: 8,
    summary:
      'No gym, no problem. These three affordable picks cover strength, mobility and nutrition for a complete beginner home-fitness kit.',
    heroImage: hero('reviewfitness'),
    topPick: 'prod_020',
    sections: [
      {
        type: 'intro',
        content:
          'Building a home gym does not require a spare room or a big budget. With one strength tool, one surface for floor work and a solid protein, most beginners have everything they need to start. We tested the most popular budget options — here is the kit we would actually buy.',
      },
      {
        type: 'comparison_table',
        heading: 'The starter kit',
        productIds: ['prod_020', 'prod_018', 'prod_019'],
      },
      {
        type: 'review',
        productId: 'prod_020',
        verdict: 'Best Protein',
        score: 8.9,
        content:
          'HealthKart’s HK Vitals whey is a clean, lab-tested everyday protein with 24g per scoop and an easy mix. It is sweet and offers limited flavours, but for the price the purity and value are hard to beat.',
      },
      {
        type: 'review',
        productId: 'prod_018',
        verdict: 'Best Strength Tool',
        score: 8.5,
        content:
          'The Boldfit resistance band set replaces a rack of dumbbells for beginners. Five levels cover most exercises, it packs into a drawer, and it travels anywhere. Bands can roll during some moves — anchor them well.',
      },
      {
        type: 'review',
        productId: 'prod_019',
        verdict: 'Best Mat',
        score: 8.1,
        content:
          'Cockatoo’s 6mm mat is cushioned enough for floor work and yoga, with grip on both sides and a handy carry strap. There is a faint new-mat smell that airs out in a day or two.',
      },
      {
        type: 'buying_guide',
        heading: 'How to start',
        content:
          'Begin with consistency, not equipment. Resistance bands give you the most exercises per rupee, a 6mm-plus mat protects your joints during floor work, and a 1kg tub of whey lasts a beginner roughly a month. Add dumbbells only once bands stop challenging you.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Do I really need protein powder?',
            a: 'Not strictly — but it is a convenient way to hit your daily protein target, which matters far more than any single supplement.',
          },
          {
            q: 'Are resistance bands as effective as weights?',
            a: 'For beginners and general fitness, absolutely. They build strength effectively; you can graduate to free weights later.',
          },
        ],
      },
    ],
  },
]

export const getReviewBySlug = (slug) => reviews.find((r) => r.slug === slug)

export const getReviewsByCategory = (categoryId) =>
  reviews.filter((r) => r.category === categoryId)

export const getRelatedReviews = (slug, limit = 3) =>
  reviews.filter((r) => r.slug !== slug).slice(0, limit)

export default reviews
