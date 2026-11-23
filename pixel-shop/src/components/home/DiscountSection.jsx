import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Copy, Timer } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import ProductGrid from '../ProductGrid'
import Countdown from './Countdown'

const COUPON_CODE = 'PIXEL-CYBER'

function onlyDiscounted(products) {
  return products.filter((product) => product.oldPrice).slice(0, 4)
}

function DiscountSection() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(COUPON_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section>
      <SectionHeading
        tag="Flash sale"
        title="تخفیف شگفت‌انگیز"
        to="/products"
        linkLabel="مشاهده همه"
      />

      <div className="overflow-hidden rounded-2xl border border-line bg-linear-to-r from-violet/25 via-surface to-pixel/15 p-6 md:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_20rem]">
          <div>
            <span className="inline-flex items-center gap-2 rounded border border-pixel/30 bg-pixel/10 px-3 py-1 text-xs text-pixel">
              <Timer size={14} />
              رویداد ویژه: جشنواره‌ی پیکسل شاپ
            </span>

            <h3 className="mt-5 text-3xl font-black leading-snug md:text-4xl md:leading-snug">
              تخفیف نقدی روی
              <span className="block text-pixel">تجهیزات منتخب گیمینگ</span>
            </h3>

            <p className="mt-4 max-w-xl leading-8 text-muted">
              فرصت محدوده؛ کنسول، دسته، کیبورد و صندلی گیمینگ رو با قیمت ویژه بخر و قبل از تموم شدن
              شمارنده سفارشت رو ثبت کن.
            </p>

            <div className="mt-6">
              <Countdown />
            </div>
          </div>

          <div className="rounded-xl border border-line bg-ink/70 p-5 backdrop-blur">
            <p className="text-xs text-cyan">کد تخفیف ویژه‌ی شما</p>

            <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-line bg-raised px-4 py-3">
              <span dir="ltr" className="font-mono text-lg font-bold tracking-widest">
                {COUPON_CODE}
              </span>
              <button
                onClick={handleCopy}
                aria-label="کپی کد تخفیف"
                className="grid size-8 place-items-center rounded-md text-muted transition-colors hover:text-pixel"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            <p className="mt-3 text-xs text-muted">اعتبار محدود به ۱۰ سفارش اول</p>

            <Link
              to="/products"
              className="mt-5 block rounded-lg bg-pixel py-3 text-center font-bold text-ink transition hover:brightness-110"
            >
              ثبت سفارش و دریافت تخفیف
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ProductGrid select={onlyDiscounted} skeletonCount={4} />
      </div>
    </section>
  )
}

export default DiscountSection