import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { loginSchema } from '../schemas/auth'
import { useLogin } from '../hooks/useLogin'
import { useAuth } from '../hooks/useAuth'
import { inputClass } from '../lib/styles'
import AuthCard from '../components/AuthCard'
import FormField from '../components/FormField'

function Login() {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const { mutate, isPending, isError, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  })

  const requested = searchParams.get('redirect')
  const redirectTo =
    requested && requested.startsWith('/') && !requested.startsWith('//') ? requested : '/'

  if (user) {
    return <Navigate to={redirectTo} replace />
  }

  function onSubmit(values) {
    mutate(values)
  }

  return (
    <AuthCard title="خوش برگشتی" subtitle="برای ادامه وارد حساب کاربریت شو">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <FormField label="ایمیل" htmlFor="email" error={errors.email}>
          <input
            id="email"
            type="email"
            dir="ltr"
            placeholder="you@example.com"
            className={inputClass(errors.email)}
            {...register('email')}
          />
        </FormField>

        <FormField label="رمز عبور" htmlFor="password" error={errors.password}>
          <input
            id="password"
            type="password"
            dir="ltr"
            placeholder="••••••••"
            className={inputClass(errors.password)}
            {...register('password')}
          />
        </FormField>

        {isError && (
          <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error.message}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-pixel py-3.5 font-bold text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? 'در حال ورود...' : 'ورود'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        حساب نداری؟{' '}
        <Link to="/register" className="font-bold text-pixel hover:underline">
          ثبت‌نام کن
        </Link>
      </p>
    </AuthCard>
  )
}

export default Login