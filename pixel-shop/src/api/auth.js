import client from './client'
import { userSchema } from '../schemas/auth'

export async function registerUser({ name, email, password }) {
  const { data: existing } = await client.get('/users', { params: { email } })

  if (existing.length > 0) {
    throw new Error('با این ایمیل قبلاً ثبت‌نام شده')
  }

  const { data } = await client.post('/users', { name, email, password })
  return userSchema.parse(data)
}

export async function loginUser({ email, password }) {
  const { data } = await client.get('/users', { params: { email } })
  const found = data.find((user) => user.password === password)

  if (!found) {
    throw new Error('ایمیل یا رمز عبور اشتباه است')
  }

  return userSchema.parse(found)
}