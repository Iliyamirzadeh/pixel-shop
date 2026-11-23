import client from './client'
import { orderSchema } from '../schemas/order'

export async function createOrder(order) {
  const { data } = await client.post('/orders', order)
  return orderSchema.parse(data)
}

export async function getOrder(id) {
  const { data } = await client.get(`/orders/${id}`)
  return orderSchema.parse(data)
}