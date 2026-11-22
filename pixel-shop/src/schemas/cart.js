import { z } from 'zod'

export const cartItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  brand: z.string(),
  category: z.string(),
  price: z.number().positive(),
  accent: z.string(),
  stock: z.number().int().nonnegative(),
  quantity: z.number().int().min(1),
})

export const cartSchema = z.array(cartItemSchema)