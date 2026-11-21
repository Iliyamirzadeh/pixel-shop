import { Link } from 'react-router-dom'
import { ArrowLeft, Gamepad2, Headset, ShieldCheck, Truck } from 'lucide-react'
import { useCategories } from '../hooks/useCategories'
import { categoryIcons } from '../lib/categoryIcons'
import ProductGrid from '../components/ProductGrid'

const perks = [
  { icon: ShieldCheck, title: 'ضمانت اصالت', text: 'همه‌ی کالاها اورجینال و دارای گارانتی معتبر' },
  { icon: Truck, title: 'ارسال سریع', text: 'ارسال در کمتر از ۴۸ ساعت به سراسر کشور' },
  { icon: Headset, title: 'پشتیبانی واقعی', text: 'مشاوره‌ی خرید توسط خود گیمرها' },
]

function Home() {
  const { data: categories } = useCategories()

  return (
    <div className="space-y-20">
      <section className="pixel-grid relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-16 md:px-16 md:py-24">
        <div className="absolute -start-24 -top-24 size-96 rounded-full bg-violet/20 blur-3xl" />
        <div className="absolute -bottom-32 -end-20 size-96 rounded-full bg-pixel/10 blur-3xl" />

        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/60 px-4 py-1.5 text-xs text-muted backdrop-blur">
            <Gamepad2 size={14} className="text-pixel" />
            فروشگاه تخصصی تجهیزات گیمینگ
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl md:leading-tight">
            بازی رو <span className="text-pixel">جدی</span> بگیر
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            از کنسول و دسته تا ماوس و کیبورد حرفه‌ای؛ هر چیزی که برای یک تجربه‌ی بی‌نقص نیاز داری،
            یک‌جا و با بهترین قیمت.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="flex items-center gap-2 rounded-xl bg-pixel px-7 py-3.5 font-bold text-ink transition hover:brightness-110"
            >
              مشاهده محصولات
              <ArrowLeft size={18} />
            </Link>
            <Link
              to="/products"
              className="rounded-xl border border-line bg-ink/60 px-7 py-3.5 font-bold backdrop-blur transition hover:border-pixel/50"
            >
              تخفیف‌های ویژه
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {perks.map((perk) => (
          <div key={perk.title} className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-raised text-pixel">
              <perk.icon size={22} />
            </span>
            <div>
              <h3 className="font-bold">{perk.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{perk.text}</p>
            </div>
          </div>
        ))}
      </section>

      {categories && (
        <section>
          <h2 className="mb-6 text-2xl font-black">دسته‌بندی‌ها</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {categories.map((category) => {
              const Icon = categoryIcons[category.slug] ?? Gamepad2
              return (
                <Link
                  key={category.id}
                  to={`/products?category=${category.slug}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface px-3 py-6 transition hover:border-pixel/50 hover:bg-raised"
                >
                  <Icon size={28} className="text-muted transition-colors group-hover:text-pixel" />
                  <span className="text-sm font-medium">{category.title}</span>
                </Link>
              )
            })}
          </div>
        </section>
      )}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-black">پرفروش‌ترین‌ها</h2>
          <Link to="/products" className="text-sm text-muted transition-colors hover:text-pixel">
            مشاهده همه
          </Link>
        </div>
        <ProductGrid params={{ _sort: 'reviews', _order: 'desc', _limit: 4 }} skeletonCount={4} />
      </section>
    </div>
  )
}

export default Home