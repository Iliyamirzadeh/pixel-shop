import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response
      ? 'مشکلی در دریافت اطلاعات از سرور پیش آمد'
      : 'ارتباط با سرور برقرار نشد'
    const friendlyError = new Error(message)
    friendlyError.status = error.response?.status
    return Promise.reject(friendlyError)
  }
)

export default client