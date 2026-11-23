import { Link } from 'react-router-dom'
import { ArrowLeft, Gamepad2, LayoutGrid } from 'lucide-react'
import { useCategories } from '../../hooks/useCategories'
import { categoryIcons } from '../../lib/categoryIcons'
import { categoryMeta } from '../../lib/categoryMeta'
import SectionHeading from '../SectionHeading'

function CategoryGrid() {
  const { data: categories } = useCategories()

  if (!categories) {
    return null
  }

  return (
    <section id="categories" className="scroll-mt-24">
      <SectionHeading
        tag="Hardware catalog"
        title="دسته‌بندی تجهیزات تخصصی"
        to="/products"
        linkLabel="مشاهده همه"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = categoryIcons[category.slug] ?? Gamepad2
          const meta = categoryMeta[category.slug]

          return (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group flex flex-col rounded-xl border border-line bg-surface p-5 transition hover:border-pixel/50 hover:bg-raised"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-lg border border-line bg-ink text-pixel">
                  <Icon size={20} />
                </span>
                <span className="tech-label">{meta?.tag}</span>
              </div>

              <h3 className="mt-6 font-bold">{category.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-7 text-muted">{meta?.text}</p>

              <span className="mt-5 flex items-center gap-1.5 text-xs font-bold text-cyan">
                مشاهده محصولات
                <ArrowLeft
                  size={14}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </span>
            </Link>
          )
        })}

        <Link
          to="/products"
          className="group flex flex-col justify-between rounded-xl border border-pixel/40 bg-pixel/10 p-5 transition hover:bg-pixel/15"
        >
          <span className="grid size-10 place-items-center rounded-lg bg-pixel text-ink">
            <LayoutGrid size={20} />
          </span>
          <div className="mt-6">
            <h3 className="font-bold">همه‌ی محصولات</h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              کل کاتالوگ پیکسل شاپ رو یک‌جا ببین و فیلتر کن
            </p>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default CategoryGrid