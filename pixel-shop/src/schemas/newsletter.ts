import { z } from 'zod'

export const newsletterSchema = z.object({
  email: z.string().trim().min(1, 'ایمیل را وارد کن').email('ایمیل معتبر نیست'),
})

export type NewsletterValues = z.infer<typeof newsletterSchema>