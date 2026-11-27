import { z } from 'zod'

const email = z.string().min(1, 'ایمیل را وارد کن').email('ایمیل معتبر نیست')

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'رمز عبور را وارد کن'),
})

export const registerSchema = z
  .object({
    name: z.string().min(1, 'نام را وارد کن').min(3, 'نام باید حداقل ۳ حرف باشد'),
    email,
    password: z
      .string()
      .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد')
      .regex(/[A-Za-z]/, 'رمز عبور باید حداقل یک حرف انگلیسی داشته باشد')
      .regex(/\d/, 'رمز عبور باید حداقل یک عدد داشته باشد'),
    confirmPassword: z.string().min(1, 'تکرار رمز عبور را وارد کن'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'رمز عبور و تکرار آن یکی نیست',
    path: ['confirmPassword'],
  })

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
})
export type User = z.infer<typeof userSchema>
export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>