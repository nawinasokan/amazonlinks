// Category tree for AmazonLinks.
// `id` is used in routes: /category/:categoryId
// Product `category` fields must match these ids.
//
// `icon` is a lucide-react component (professional SVG icon set), rendered
// like <cat.icon className="h-5 w-5" />. Swap the import below to restyle.
import {
  Laptop,
  CookingPot,
  BookOpen,
  Shirt,
  Dumbbell,
  SprayCan,
  Gamepad2,
  PencilRuler,
} from 'lucide-react'

export const categories = [
  {
    id: 'electronics',
    label: 'Electronics',
    icon: Laptop,
    color: '#146EB4',
    description:
      'Headphones, smartphones, laptops, cameras and smartwatches — hand-picked and expert-reviewed for the best value in India.',
    subcategories: ['Headphones', 'Smartphones', 'Laptops', 'Cameras', 'Smartwatches'],
  },
  {
    id: 'home-kitchen',
    label: 'Home & Kitchen',
    icon: CookingPot,
    color: '#007600',
    description:
      'Everyday essentials for your home and kitchen — cookware, appliances, storage and decor that earn their counter space.',
    subcategories: ['Cookware', 'Appliances', 'Storage', 'Decor', 'Cleaning'],
  },
  {
    id: 'books',
    label: 'Books',
    icon: BookOpen,
    color: '#B12704',
    description:
      'Bestsellers and timeless reads across fiction, non-fiction and self-help, curated by our editorial team.',
    subcategories: ['Fiction', 'Non-Fiction', 'Self-Help', 'Children', 'Academic'],
  },
  {
    id: 'fashion',
    label: 'Fashion',
    icon: Shirt,
    color: '#FF9900',
    description:
      'Wardrobe staples and accessories — apparel, footwear, watches and bags that balance style, fit and price.',
    subcategories: ['Men', 'Women', 'Footwear', 'Watches', 'Bags'],
  },
  {
    id: 'sports-fitness',
    label: 'Sports & Fitness',
    icon: Dumbbell,
    color: '#146EB4',
    description:
      'Gear up — fitness equipment, sportswear, yoga essentials and supplements to power your training.',
    subcategories: ['Fitness Equipment', 'Sportswear', 'Cycling', 'Yoga', 'Supplements'],
  },
  {
    id: 'beauty',
    label: 'Beauty & Personal Care',
    icon: SprayCan,
    color: '#B12704',
    description:
      'Skincare, haircare, grooming and fragrances — tried-and-tested picks for your daily routine.',
    subcategories: ['Skincare', 'Haircare', 'Makeup', 'Fragrances', 'Grooming'],
  },
  {
    id: 'toys-games',
    label: 'Toys & Games',
    icon: Gamepad2,
    color: '#007600',
    description:
      'Board games, building sets, educational toys and puzzles that keep kids (and adults) hooked.',
    subcategories: ['Board Games', 'Educational', 'Action Figures', 'Outdoor', 'Puzzles'],
  },
  {
    id: 'office',
    label: 'Office Supplies',
    icon: PencilRuler,
    color: '#146EB4',
    description:
      'Stationery, organizers, printers and tech accessories to keep your desk and workflow in order.',
    subcategories: ['Stationery', 'Furniture', 'Printers', 'Organizers', 'Tech Accessories'],
  },
]

export const getCategoryById = (id) => categories.find((c) => c.id === id)

export default categories
