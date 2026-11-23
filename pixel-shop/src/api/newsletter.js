import client from './client'

export async function subscribe({ email }) {
  const { data: existing } = await client.get('/subscribers', { params: { email } })

  if (existing.length > 0) {
    throw new Error('این ایمیل قبلاً عضو شده')
  }

  await client.post('/subscribers', { email, createdAt: new Date().toISOString() })
}