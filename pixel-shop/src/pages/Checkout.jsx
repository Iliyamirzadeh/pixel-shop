import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Navigate } from 'react-router-dom'
import { Wallet } from 'lucide-react'
import { checkoutSchema } from '../schemas/order'
import { useCreateOrder } from '../hooks/useCreateOrder'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { inputClass } from '../lib/styles'
import { formatPrice } from '../lib/format'
import FormField from '../components/FormField'
import OrderItems from '../components/OrderItems'

function Checkout() {
  const { user } = useAuth()
  const { items, totalCount, totalPrice, clearCart } = useCart()
  const { mutate, isPending, isError, error } = useCreateOrder()
  const [placedId, setPlacedId] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user.name,
      phone: '',
      city: '',
      postalCode: '',
      address: '',
      note: '',
    },
    mode: 'onTouched',
  })

  if (placedId) {
    return <Navigate to={`/order/success/${placedId}`} replace />
  }

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  function onSubmit(shipping) {
    const order = {
      userId: user.id,
      createdAt: new Date().toISOString(),
      status: 'pending',
      totalPrice,
      items,
      shipping,
    }

    mutate(order, {
      onSuccess: (created) => {
        setPlacedId(created.id)
        clearCart()
      },
    })
  }

  return (
    <div>
      <h1 className="text-3xl font-black">تکمیل سفارش</h1>
      <p className="mt-2 text-muted">اطلاعات تحویل رو وارد کن تا سفارشت ثبت بشه</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-8 grid gap-8 lg:grid-cols-3"
      >
        <div className="space-y-5 rounded-2xl border border-line bg-surface p-6 lg:col-span-2">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="نام و نام خانوادگی" htmlFor="fullName" error={errors.fullName}>
              <input
                id="fullName"
                type="text"
                className={inputClass(errors.fullName)}
                {...register('fullName')}
              />
            </FormField>

            <FormField label="شماره موبایل" htmlFor="phone" error={errors.phone}>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                dir="ltr"
                placeholder="09123456789"
                className={inputClass(errors.phone)}
                {...register('phone')}
              />
            </FormField>

            <FormField label="شهر" htmlFor="city" error={errors.city}>
              <input
                id="city"
                type="text"
                className={inputClass(errors.city)}
                {...register('city')}
              />
            </FormField>

            <FormField label="کد پستی" htmlFor="postalCode" error={errors.postalCode}>
              <input
                id="postalCode"
                type="text"
                inputMode="numeric"
                dir="ltr"
                placeholder="1234567890"
                className={inputClass(errors.postalCode)}
                {...register('postalCode')}
              />
            </FormField>
          </div>

          <FormField label="آدرس کامل" htmlFor="address" error={errors.address}>
            <textarea
              id="address"
              rows={3}
              className={`${inputClass(errors.address)} resize-none`}
              {...register('address')}
            />
          </FormField>

          <FormField label="توضیحات (اختیاری)" htmlFor="note" error={errors.note}>
            <textarea
              id="note"
              rows={2}
              className={`${inputClass(errors.note)} resize-none`}
              {...register('note')}
            />
          </FormField>
        </div>
        <aside className="h-fit rounded-2xl border border-line bg-surface p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-black">خلاصه سفارش</h2>

          <div className="mt-4">
            <OrderItems items={items} />
          </div>

          <dl className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">تعداد کالا</dt>
              <dd>{totalCount.toLocaleString('fa-IR')}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">هزینه ارسال</dt>
              <dd className="text-pixel">رایگان</dd>
            </div>
            <div className="flex justify-between text-base">
              <dt className="font-bold">مبلغ قابل پرداخت</dt>
              <dd className="font-black">
                {formatPrice(totalPrice)}
                <span className="ms-1 text-xs font-normal text-muted">تومان</span>
              </dd>
            </div>
          </dl>

          <p className="mt-4 flex items-center gap-2 rounded-lg bg-raised px-3 py-2.5 text-xs text-muted">
            <Wallet size={16} className="shrink-0 text-cyan" />
            پرداخت هنگام تحویل کالا
          </p>

          {isError && (
            <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-5 w-full rounded-xl bg-pixel py-3.5 font-bold text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? 'در حال ثبت سفارش...' : 'ثبت نهایی سفارش'}
          </button>
        </aside>
      </form>
    </div>
  )
}

export default Checkout