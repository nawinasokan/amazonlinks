// Structured buying guides for AmazonLinks (/guide/:slug).
// Rendered as a magazine-style article: What to Look For → Top Recommendations
// → Comparison Table → FAQ, with inline affiliate CTAs and Expert Score badges.

const hero = (seed) => `https://picsum.photos/seed/${seed}/1200/600`

export const guides = [
  {
    id: 'guide_001',
    slug: 'how-to-choose-bluetooth-headphones',
    title: 'How to Choose Bluetooth Headphones: A Complete Buying Guide',
    category: 'electronics',
    publishedDate: '2026-05-05',
    author: 'AmazonLinks Editorial Team',
    readingTime: 8,
    summary:
      'Battery, sound, comfort and call quality — everything that actually matters when buying wireless headphones, plus our expert-scored picks.',
    heroImage: hero('guideheadphones'),
    intro:
      'Wireless headphones are deceptively hard to shop for: the spec sheet rarely predicts how a pair sounds or feels after an hour. This guide walks through the four things that genuinely matter, then points you to models we have tested and scored.',
    whatToLookFor: [
      {
        title: 'Battery life',
        content:
          'Aim for 30+ hours so you charge weekly, not daily. Look for USB-C and a fast-charge mode that turns a few minutes into hours of playback.',
      },
      {
        title: 'Sound signature',
        content:
          'Bass-forward tuning is fun for pop and EDM; a neutral profile suits podcasts and acoustic. An app with EQ lets you reshape the sound to taste.',
      },
      {
        title: 'Comfort & fit',
        content:
          'On-ear pairs are light and portable but can clamp; over-ear designs are comfier for marathons. Check clamp force and ear-cup padding in real-world reviews.',
      },
      {
        title: 'Call quality',
        content:
          'The most overstated spec. Prioritise models with multiple microphones and multipoint pairing, and trust user reviews over marketing claims.',
      },
    ],
    recommendations: [
      {
        productId: 'prod_002',
        expertScore: 9.2,
        note: 'Our overall pick — 50-hour battery, app EQ and multipoint make it the safe choice for most buyers.',
      },
      {
        productId: 'prod_003',
        expertScore: 8.7,
        note: 'Best for bass lovers, with fast USB-C charging and a huge 40-hour battery.',
      },
      {
        productId: 'prod_001',
        expertScore: 8.4,
        note: 'Unbeatable value under ₹1,500 and frequently on deal — the easy first wireless pair.',
      },
    ],
    comparisonProductIds: ['prod_002', 'prod_003', 'prod_001'],
    faq: [
      {
        q: 'How many hours of battery do I really need?',
        a: 'For most people 30+ hours means charging roughly once a week. Heavy commuters should look for 40 hours or more.',
      },
      {
        q: 'Is active noise cancellation worth it on a budget?',
        a: 'Below ₹4,000, ANC is usually weak. You are better off spending the budget on better sound and battery, and choosing a snug fit for passive isolation.',
      },
    ],
  },

  {
    id: 'guide_002',
    slug: 'budget-smartphone-buying-guide-2026',
    title: 'Budget Smartphone Buying Guide (Under ₹20,000) — 2026',
    category: 'electronics',
    publishedDate: '2026-04-22',
    author: 'AmazonLinks Editorial Team',
    readingTime: 10,
    summary:
      'Display, battery, chipset and updates — the specs worth paying for under ₹20,000, and the ones marketing wants you to overpay for.',
    heroImage: hero('guidephones'),
    intro:
      'The sub-₹20,000 segment is the most competitive in India, which is great for buyers and confusing at the same time. Here is how to cut through the spec war and buy a phone that still feels good two years from now.',
    whatToLookFor: [
      {
        title: 'Display',
        content:
          'A 120Hz AMOLED panel is the single biggest day-to-day upgrade — deeper blacks, smoother scrolling and better battery than an LCD at this price.',
      },
      {
        title: 'Battery & charging',
        content:
          'Look for a 5,000mAh+ cell. 33W charging is the practical sweet spot; faster is nice but rarely essential.',
      },
      {
        title: 'Chipset',
        content:
          'A recent mid-range 5G chip handles everything most people do. Do not overpay for raw benchmarks you will never use.',
      },
      {
        title: 'Software updates',
        content:
          'Two OS upgrades and regular security patches keep a budget phone safe and usable for longer — check the brand’s commitment before buying.',
      },
    ],
    recommendations: [
      {
        productId: 'prod_004',
        expertScore: 8.8,
        note: 'Best overall under ₹20,000 — 120Hz AMOLED, 108MP camera and fast charging.',
      },
      {
        productId: 'prod_005',
        expertScore: 8.0,
        note: 'Battery champion with a massive 6,000mAh cell, ideal for light users who hate charging.',
      },
    ],
    comparisonProductIds: ['prod_004', 'prod_005'],
    faq: [
      {
        q: 'AMOLED or high refresh rate — which matters more?',
        a: 'Ideally both, and the Redmi Note 13 5G gives you each. If forced to choose, AMOLED makes the bigger everyday difference.',
      },
      {
        q: 'How important are software updates?',
        a: 'Very — they keep your phone secure and feeling current. Two guaranteed OS upgrades is the minimum to look for.',
      },
    ],
  },

  {
    id: 'guide_003',
    slug: 'home-gym-setup-guide-for-beginners',
    title: 'Home Gym Setup Guide for Beginners (On a Budget)',
    category: 'sports-fitness',
    publishedDate: '2026-05-15',
    author: 'AmazonLinks Editorial Team',
    readingTime: 7,
    summary:
      'You can build an effective home workout space for under ₹3,000. Here is exactly what to buy first — and what to skip.',
    heroImage: hero('guidefitness'),
    intro:
      'Most beginners overspend on equipment they barely use. The truth is you can train your whole body with three inexpensive items. This guide covers what to prioritise and our expert-scored picks for each.',
    whatToLookFor: [
      {
        title: 'Versatility over volume',
        content:
          'One adjustable tool that does many exercises beats a pile of single-purpose gear. Resistance bands are the best example.',
      },
      {
        title: 'Joint protection',
        content:
          'A 6mm-or-thicker mat makes floor work and yoga comfortable and protects your knees, wrists and spine.',
      },
      {
        title: 'Nutrition basics',
        content:
          'Hitting a daily protein target matters more than any gadget. A clean, lab-tested whey is a convenient way to get there.',
      },
    ],
    recommendations: [
      {
        productId: 'prod_018',
        expertScore: 8.5,
        note: 'Buy this first — five resistance levels replace a rack of dumbbells for beginners.',
      },
      {
        productId: 'prod_019',
        expertScore: 8.1,
        note: 'A cushioned, grippy mat for yoga, stretching and floor work.',
      },
      {
        productId: 'prod_020',
        expertScore: 8.9,
        note: 'A clean everyday whey to round out the basics of a beginner routine.',
      },
    ],
    comparisonProductIds: ['prod_018', 'prod_019', 'prod_020'],
    faq: [
      {
        q: 'What should I buy first for a home gym?',
        a: 'A resistance band set. It offers the most exercises per rupee and packs away in a drawer.',
      },
      {
        q: 'Do I need a bench or rack to start?',
        a: 'No. Beginners can train effectively with bands, bodyweight and a mat for months before needing anything bigger.',
      },
    ],
  },
]

export const getGuideBySlug = (slug) => guides.find((g) => g.slug === slug)

export const getGuidesByCategory = (categoryId) =>
  guides.filter((g) => g.category === categoryId)

export default guides
