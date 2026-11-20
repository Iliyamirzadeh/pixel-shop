import { z } from 'zod'

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  brand: z.string(),
  category: z.string(),
  price: z.number().positive(),
  oldPrice: z.number().positive().nullable(),
  rating: z.number().min(0).max(5),
  reviews: z.number().int().nonnegative(),
  stock: z.number().int().nonnegative(),
  accent: z.string(),
  description: z.string(),
})

export const categorySchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
})