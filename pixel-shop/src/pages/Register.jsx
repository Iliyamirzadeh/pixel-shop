import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { registerSchema } from '../schemas/auth'
import { useRegister } from '../hooks/useRegister'
import { useAuth } from '../hooks/useAuth'
import { inputClass } from '../lib/styles'
import AuthCard from '../components/AuthCard'
import FormField from '../components/FormField'

function Register() {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const { mutate, isPending, isError, error } = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
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
    <AuthCard title="ساخت حساب کاربری" subtitle="چند ثانیه وقت بذار و به پیکسل شاپ بپیوند">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <FormField label="نام" htmlFor="name" error={errors.name}>
          <input
            id="name"
            type="text"
            placeholder="مثلاً ایلیا"
            className={inputClass(errors.name)}
            {...register('name')}
          />
        </FormField>

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

        <FormField label="تکرار رمز عبور" htmlFor="confirmPassword" error={errors.confirmPassword}>
          <input
            id="confirmPassword"
            type="password"
            dir="ltr"
            placeholder="••••••••"
            className={inputClass(errors.confirmPassword)}
            {...register('confirmPassword')}
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
          {isPending ? 'در حال ساخت حساب...' : 'ثبت‌نام'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        قبلاً ثبت‌نام کردی؟{' '}
        <Link to="/login" className="font-bold text-pixel hover:underline">
          وارد شو
        </Link>
      </p>
    </AuthCard>
  )
}

export default Register