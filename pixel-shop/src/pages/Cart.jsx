import { Link } from 'react-router-dom'
import { Gamepad2, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { categoryIcons } from '../lib/categoryIcons'
import { formatPrice } from '../lib/format'
import { getProductImage } from '../lib/productImages'

function Cart() {

  const { user } = useAuth()
  const { items, totalCount, totalPrice, increaseItem, decreaseItem, removeItem, clearCart } =
    useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <span className="grid size-20 place-items-center rounded-full bg-surface text-muted">
          <ShoppingBag size={36} />
        </span>
        <h1 className="mt-6 text-2xl font-black">سبد خرید خالیه</h1>
        <p className="mt-2 text-muted">هنوز محصولی انتخاب نکردی</p>
        <Link
          to="/products"
          className="mt-8 rounded-xl bg-pixel px-7 py-3.5 font-bold text-ink transition hover:brightness-110"
        >
          دیدن محصولات
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-black">سبد خرید</h1>
        <button
          onClick={clearCart}
          className="text-sm text-muted transition-colors hover:text-red-400"
        >
          خالی کردن سبد
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {items.map((item) => {
            const Icon = categoryIcons[item.category] ?? Gamepad2
            const image = getProductImage(item.id)

            return (
              <li
                key={item.id}
                className="flex gap-4 rounded-2xl border border-line bg-surface p-4"
              >
                <Link
                  to={`/products/${item.id}`}
                  className={`grid size-24 shrink-0 place-items-center overflow-hidden rounded-xl border ${image ? 'border-line bg-white' : 'pixel-grid bg-ink'
                    }`}
                  style={image ? undefined : { color: item.accent, borderColor: `${item.accent}55` }}
                >
                  {image ? (
                    <img src={image} alt={item.title} className="size-full object-contain" />
                  ) : (
                    <Icon size={36} strokeWidth={1.5} />
                  )}
                </Link>

                <div className="flex flex-1 flex-col justify-between gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-muted">{item.brand}</p>
                      <Link
                        to={`/products/${item.id}`}
                        className="font-bold transition-colors hover:text-pixel"
                      >
                        {item.title}
                      </Link>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="حذف از سبد"
                      className="grid size-9 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-raised hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-line">
                      <button
                        onClick={() => decreaseItem(item.id)}
                        aria-label="کم کردن"
                        className="grid size-9 place-items-center transition-colors hover:text-pixel"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">
                        {item.quantity.toLocaleString('fa-IR')}
                      </span>
                      <button
                        onClick={() => increaseItem(item.id)} disabled={item.quantity >= item.stock}
                        aria-label="اضافه کردن"
                        className="grid size-9 place-items-center transition-colors hover:text-pixel disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-snow"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <p className="font-black">
                      {formatPrice(item.price * item.quantity)}
                      <span className="ms-1 text-xs font-normal text-muted">تومان</span>
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul >

        <aside className="h-fit rounded-2xl border border-line bg-surface p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-black">خلاصه سفارش</h2>

          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">تعداد کالا</dt>
              <dd>{totalCount.toLocaleString('fa-IR')}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">هزینه ارسال</dt>
              <dd className="text-pixel">رایگان</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-4 text-base">
              <dt className="font-bold">مبلغ قابل پرداخت</dt>
              <dd className="font-black">
                {formatPrice(totalPrice)}
                <span className="ms-1 text-xs font-normal text-muted">تومان</span>
              </dd>
            </div>
          </dl>

          {user ? (
            <Link
              to="/checkout"
              className="mt-6 block w-full rounded-xl bg-pixel py-3.5 text-center font-bold text-ink transition hover:brightness-110"
            >
              ادامه فرآیند خرید
            </Link>
          ) : (
            <Link
              to="/login?redirect=/checkout"
              className="mt-6 block w-full rounded-xl bg-pixel py-3.5 text-center font-bold text-ink transition hover:brightness-110"
            >
              برای ادامه وارد شو
            </Link>
          )}
        </aside>
      </div >
    </div >
  )
}

export default Cart