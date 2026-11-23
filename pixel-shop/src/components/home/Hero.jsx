import { Link } from 'react-router-dom'
import { ArrowLeft, Lock, Package } from 'lucide-react'
import HeroShowcase from './HeroShowcase'

const brands = [
  { label: 'سونی', query: 'Sony' },
  { label: 'مایکروسافت', query: 'Microsoft' },
  { label: 'لاجیتک', query: 'Logitech' },
  { label: 'ریزر', query: 'Razer' },
  { label: 'کیکرون', query: 'Keychron' },
  { label: 'های‌پرایکس', query: 'HyperX' },
]

const assurances = [
  { icon: Package, text: 'بسته‌بندی ضدضربه' },
  { icon: Lock, text: 'پرداخت امن' },
]

function Hero() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute -end-24 -top-24 size-[28rem] rounded-full bg-pixel/10 blur-3xl" />

      <div className="relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-black leading-tight md:text-6xl md:leading-tight">
            تجهیزاتی که بازی رو
            <span className="block text-pixel">کاملاً عوض می‌کنه</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-muted md:text-lg">
            از کنسول و دسته تا ماوس و کیبورد حرفه‌ای؛ هر چیزی که برای یک تجربه‌ی بی‌نقص نیاز داری،
            یک‌جا و با ضمانت اصالت.
          </p>

          <div className="mt-8">
            <p className="mb-3 text-xs text-muted">برندهای محبوب فروشگاه</p>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <Link
                  key={brand.query}
                  to={`/products?q=${brand.query}`}
                  className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-pixel/50 hover:text-pixel"
                >
                  {brand.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="flex items-center gap-2 rounded-lg bg-pixel px-7 py-3.5 font-bold text-ink transition hover:brightness-110"
            >
              مشاهده محصولات
              <ArrowLeft size={18} />
            </Link>
            <a
              href="#categories"
              className="rounded-lg border border-line bg-surface px-7 py-3.5 font-bold transition hover:border-pixel/50"
            >
              دسته‌بندی‌ها
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
            {assurances.map((item) => (
              <span key={item.text} className="flex items-center gap-2">
                <item.icon size={16} className="text-cyan" />
                {item.text}
              </span>
            ))}
          </div>
        </div>

        <HeroShowcase />
      </div>
    </section>
  )
}

export default Hero