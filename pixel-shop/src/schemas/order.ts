import { z } from 'zod'
import { cartSchema } from './cart'
import { toEnglishDigits } from '../lib/digits'

function digitsField(pattern: RegExp, message: string) {
  return z
    .string()
    .trim()
    .transform(toEnglishDigits)
    .pipe(z.string().regex(pattern, message))
}

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(3, 'نام و نام خانوادگی را کامل وارد کن'),
  phone: digitsField(/^09\d{9}$/, 'شماره موبایل معتبر نیست (مثل ۰۹۱۲۳۴۵۶۷۸۹)'),
  city: z.string().trim().min(2, 'شهر را وارد کن'),
  postalCode: digitsField(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد'),
  address: z.string().trim().min(10, 'آدرس را کامل‌تر بنویس'),
  note: z.string().trim().max(200, 'توضیحات حداکثر ۲۰۰ کاراکتر باشد'),
})

export const orderSchema = z.object({
  id: z.number(),
  userId: z.number(),
  createdAt: z.string(),
  status: z.string(),
  totalPrice: z.number().positive(),
  items: cartSchema,
  shipping: checkoutSchema,
})
export type Order = z.infer<typeof orderSchema>
export type CheckoutValues = z.infer<typeof checkoutSchema>