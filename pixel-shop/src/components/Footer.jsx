import { Link } from 'react-router-dom'
import { Clock, Gamepad2, Mail } from 'lucide-react'
import { useCategories } from '../hooks/useCategories'
import NewsletterForm from './NewsletterForm'

const quickLinks = [
  { to: '/products', label: 'همه‌ی محصولات' },
  { to: '/cart', label: 'سبد خرید' },
  { to: '/login', label: 'ورود به حساب' },
  { to: '/register', label: 'ثبت‌نام' },
]

function FooterTitle({ children }) {
  return (
    <h3 className="flex items-center gap-2 font-bold">
      <span className="size-1.5 bg-pixel" />
      {children}
    </h3>
  )
}

function Footer() {
  const { data: categories } = useCategories()

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-md bg-pixel text-ink">
              <Gamepad2 size={18} strokeWidth={2.5} />
            </span>
            <span className="font-black">پیکسل شاپ</span>
          </Link>
          <p className="mt-4 text-sm leading-7 text-muted">
            مرجع خرید کنسول، لوازم جانبی و تجهیزات گیمینگ اورجینال با ضمانت اصالت و ارسال سریع.
          </p>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            <li className="flex items-center gap-2.5">
              <Clock size={16} className="text-pixel" />
              همه‌روزه ۹ تا ۲۱
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-pixel" />
              <span dir="ltr">support@pixelshop.ir</span>
            </li>
          </ul>
        </div>

        <div>
          <FooterTitle>دسترسی سریع</FooterTitle>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-pixel">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterTitle>دسته‌بندی‌ها</FooterTitle>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            {categories?.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/products?category=${category.slug}`}
                  className="transition-colors hover:text-pixel"
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterTitle>خبرنامه</FooterTitle>
          <p className="mb-4 mt-5 text-sm leading-7 text-muted">
            از تخفیف‌ها و محصولات جدید زودتر از همه باخبر شو.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted sm:flex-row">
          <p>تمامی حقوق برای پیکسل شاپ محفوظ است</p>
          <p dir="ltr" className="tech-label">
            React · Tailwind · TanStack Query
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer