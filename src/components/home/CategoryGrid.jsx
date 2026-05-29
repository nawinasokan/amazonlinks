import { Link } from 'react-router-dom'
import categories from '../../data/categories'
import { productCountByCategory } from '../../data/products'
import SectionHeading from '../ui/SectionHeading'

export default function CategoryGrid() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading
          title="Shop by Category"
          subtitle="Browse expert-curated picks across every category."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="group flex flex-col items-center rounded-xl border border-gray-200 bg-white p-5 text-center shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-amazon-orange/50 hover:shadow-card-hover"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: `${cat.color}1A` }}
              >
                {cat.icon}
              </span>
              <h3 className="mt-3 text-sm font-bold text-[#111111]">{cat.label}</h3>
              <p className="mt-0.5 text-xs text-[#565959]">
                {productCountByCategory(cat.id)} products
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
