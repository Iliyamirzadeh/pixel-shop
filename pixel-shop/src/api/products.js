import client from './client'
import { productSchema, categorySchema } from '../schemas/product'

export async function getProducts(params = {}) {
  const { data } = await client.get('/products', { params })
  return productSchema.array().parse(data)
}

export async function getProduct(id) {
  const { data } = await client.get(`/products/${id}`)
  return productSchema.parse(data)
}

export async function getCategories() {
  const { data } = await client.get('/categories')
  return categorySchema.array().parse(data)
}