import { Link, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useOrder } from '../hooks/useOrder'
import { useAuth } from '../hooks/useAuth'
import { formatDate, formatOrderCode, formatPrice } from '../lib/format'
import ErrorMessage from '../components/ErrorMessage'
import OrderItems from '../components/OrderItems'

function OrderSuccess() {
  const { id } = useParams()
  const { user } = useAuth()
  const { data: order, isPending, isError, error, refetch } = useOrder(id)

  if (isPending) {
    return <div className="mx-auto h-96 max-w-2xl animate-pulse rounded-2xl bg-surface" />
  }

  if (isError) {
    if (error.status === 404) {
      return <ErrorMessage message="این سفارش وجود ندارد" />
    }
    return <ErrorMessage message={error.message} onRetry={refetch} />
  }

  if (order.userId !== user.id) {
    return <ErrorMessage message="این سفارش وجود ندارد" />
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col items-center text-center">
        <span className="grid size-16 place-items-center rounded-full border border-pixel/40 bg-pixel/10 text-pixel">
          <Check size={32} strokeWidth={2.5} />
        </span>
        <h1 className="mt-6 text-3xl font-black">سفارشت با موفقیت ثبت شد</h1>
        <p className="mt-2 text-muted">به‌زودی برای هماهنگی تحویل باهات تماس میگیریم</p>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 text-sm">
          <div>
            <p className="text-muted">شماره سفارش</p>
            <p dir="ltr" className="mt-1 text-start font-mono font-bold text-pixel">
              {formatOrderCode(order.id)}
            </p>
          </div>
          <div>
            <p className="text-muted">تاریخ ثبت</p>
            <p className="mt-1 font-bold">{formatDate(order.createdAt)}</p>
          </div>
        </div>

        <div className="py-2">
          <OrderItems items={order.items} />
        </div>

        <div className="flex items-center justify-between border-t border-line pt-4">
          <span className="font-bold">مبلغ قابل پرداخت</span>
          <span className="font-black">
            {formatPrice(order.totalPrice)}
            <span className="ms-1 text-xs font-normal text-muted">تومان</span>
          </span>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-line bg-surface p-6 text-sm">
        <h2 className="font-black">اطلاعات تحویل</h2>
        <dl className="mt-4 space-y-3">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">گیرنده</dt>
            <dd>{order.shipping.fullName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">موبایل</dt>
            <dd>{Number(order.shipping.phone).toLocaleString('fa-IR', { useGrouping: false }).padStart(11, '۰')}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">شهر</dt>
            <dd>{order.shipping.city}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="shrink-0 text-muted">آدرس</dt>
            <dd className="text-end leading-7">{order.shipping.address}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/products"
          className="rounded-xl bg-pixel px-7 py-3.5 font-bold text-ink transition hover:brightness-110"
        >
          ادامه خرید
        </Link>
        <Link
          to="/"
          className="rounded-xl border border-line bg-surface px-7 py-3.5 font-bold transition hover:border-pixel/50"
        >
          صفحه‌ی اصلی
        </Link>
      </div>
    </div>
  )
}

export default OrderSuccess