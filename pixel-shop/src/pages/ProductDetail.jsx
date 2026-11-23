import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check, ShieldCheck, ShoppingCart, Star, Truck } from 'lucide-react'
import { useProduct } from '../hooks/useProduct'
import { useCart } from '../hooks/useCart'
import ProductVisual from '../components/ProductVisual'
import ErrorMessage from '../components/ErrorMessage'
import { formatPrice } from '../lib/format'

function ProductDetailSkeleton() {
  return (
    <div className="grid animate-pulse gap-10 lg:grid-cols-2">
      <div className="aspect-[4/3] rounded-3xl bg-surface" />
      <div className="space-y-4">
        <div className="h-4 w-24 rounded bg-surface" />
        <div className="h-8 w-3/4 rounded bg-surface" />
        <div className="h-4 w-40 rounded bg-surface" />
        <div className="h-24 rounded bg-surface" />
        <div className="h-12 w-48 rounded bg-surface" />
      </div>
    </div>
  )
}

function ProductDetail() {
  const { id } = useParams()
  const { data: product, isPending, isError, error, refetch } = useProduct(id)
  const { items, addItem } = useCart()

  if (isPending) {
    return <ProductDetailSkeleton />
  }

  if (isError) {
    if (error.status === 404) {
      return <ErrorMessage message="این محصول وجود ندارد" />
    }
    return <ErrorMessage message={error.message} onRetry={refetch} />
  }

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0

  const inCart = items.find((item) => item.id === product.id)?.quantity ?? 0
  const reachedLimit = inCart >= product.stock

  return (
    <div>
      <Link
        to="/products"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-pixel"
      >
        <ArrowRight size={16} />
        بازگشت به محصولات
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-line">
          <ProductVisual product={product} large />
        </div>

        <div>
          <p className="text-sm font-medium tracking-wider text-muted">{product.brand}</p>
          <h1 className="mt-2 text-3xl font-black leading-snug">{product.title}</h1>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted">
            <Star size={16} className="fill-pixel text-pixel" />
            <span className="font-bold text-snow">{product.rating.toLocaleString('fa-IR')}</span>
            <span>({product.reviews.toLocaleString('fa-IR')} نظر)</span>
          </div>

          <p className="mt-6 leading-8 text-muted">{product.description}</p>

          <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black">{formatPrice(product.price)}</span>
              <span className="text-muted">تومان</span>
              {discount > 0 && (
                <span className="rounded-md bg-pixel px-2 py-1 text-xs font-black text-ink">
                  {discount.toLocaleString('fa-IR')}٪
                </span>
              )}
            </div>
            {product.oldPrice && (
              <p className="mt-1 text-sm text-muted line-through">{formatPrice(product.oldPrice)}</p>
            )}

            <p className="mt-4 flex items-center gap-2 text-sm">
              {product.stock > 0 ? (
                <>
                  <Check size={16} className="text-pixel" />
                  <span>موجود در انبار</span>
                </>
              ) : (
                <span className="text-red-400">ناموجود</span>
              )}
            </p>

            <button
              onClick={() => addItem(product)}
              disabled={product.stock === 0 || reachedLimit}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-pixel py-3.5 font-bold text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
              <ShoppingCart size={20} />
              {reachedLimit && product.stock > 0 ? 'به سقف موجودی رسیدی' : 'افزودن به سبد خرید'}
            </button>

            {inCart > 0 && (
              <Link
                to="/cart"
                className="mt-3 block text-center text-sm text-muted transition-colors hover:text-pixel"
              >
                {inCart.toLocaleString('fa-IR')} عدد از این محصول تو سبد توئه، مشاهده سبد
              </Link>
            )}
          </div>

          <div className="mt-6 grid gap-3 text-sm text-muted sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-pixel" />
              ضمانت اصالت کالا
            </div>
            <div className="flex items-center gap-3">
              <Truck size={20} className="text-pixel" />
              ارسال در ۴۸ ساعت
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail    