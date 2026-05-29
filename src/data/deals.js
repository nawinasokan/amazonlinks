// Active deal listings for AmazonLinks.
// `productId` links to products.js. `expiresAt` drives the countdown timers.
// dealType: 'Lightning Deal' | 'Limited Time' | 'Coupon'

export const deals = [
  {
    id: 'deal_001',
    productId: 'prod_001',
    title: '50% OFF boAt Rockerz 450 Headphones',
    expiresAt: '2026-05-31T23:59:59',
    dealType: 'Lightning Deal',
  },
  {
    id: 'deal_002',
    productId: 'prod_007',
    title: 'Noise ColorFit Pro 5 — Flat 50% Off',
    expiresAt: '2026-06-01T18:00:00',
    dealType: 'Lightning Deal',
  },
  {
    id: 'deal_003',
    productId: 'prod_004',
    title: 'Redmi Note 13 5G — Lowest Price Ever',
    expiresAt: '2026-06-10T23:59:59',
    dealType: 'Limited Time',
  },
  {
    id: 'deal_004',
    productId: 'prod_012',
    title: 'Atomic Habits — Bestseller at ₹399',
    expiresAt: '2026-06-15T23:59:59',
    dealType: 'Limited Time',
  },
  {
    id: 'deal_005',
    productId: 'prod_009',
    title: 'Prestige Induction Cooktop — 36% Off',
    expiresAt: '2026-05-30T21:00:00',
    dealType: 'Lightning Deal',
  },
  {
    id: 'deal_006',
    productId: 'prod_017',
    title: 'Campus Running Shoes — Buy at ₹799',
    expiresAt: '2026-06-20T23:59:59',
    dealType: 'Coupon',
  },
  {
    id: 'deal_007',
    productId: 'prod_023',
    title: 'Philips Beard Trimmer — Extra Coupon',
    expiresAt: '2026-06-12T23:59:59',
    dealType: 'Coupon',
  },
  {
    id: 'deal_008',
    productId: 'prod_025',
    title: "LEGO Classic Brick Box — Editor's Pick Deal",
    expiresAt: '2026-06-30T23:59:59',
    dealType: 'Limited Time',
  },
  {
    id: 'deal_009',
    productId: 'prod_018',
    title: 'Boldfit Resistance Bands — 55% Off',
    expiresAt: '2026-06-02T12:00:00',
    dealType: 'Lightning Deal',
  },
  {
    id: 'deal_010',
    productId: 'prod_003',
    title: 'JBL Tune 510BT — Save 43%',
    expiresAt: '2026-06-25T23:59:59',
    dealType: 'Limited Time',
  },
  {
    id: 'deal_011',
    productId: 'prod_011',
    title: 'Pigeon Cookware Set — 45% Off',
    expiresAt: '2026-06-08T23:59:59',
    dealType: 'Coupon',
  },
  {
    id: 'deal_012',
    productId: 'prod_013',
    title: 'Ikigai — Bestselling Read at ₹299',
    expiresAt: '2026-06-18T23:59:59',
    dealType: 'Limited Time',
  },
  {
    id: 'deal_013',
    productId: 'prod_021',
    title: 'Mamaearth Vitamin C Face Wash — 30% Off',
    expiresAt: '2026-05-30T15:00:00',
    dealType: 'Coupon',
  },
  {
    id: 'deal_014',
    productId: 'prod_029',
    title: 'HP DeskJet All-in-One Printer — 31% Off',
    expiresAt: '2026-07-05T23:59:59',
    dealType: 'Limited Time',
  },
]

export const getDealByProductId = (productId) =>
  deals.find((d) => d.productId === productId)

export default deals
