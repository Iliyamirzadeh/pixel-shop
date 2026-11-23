import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
import { newsletterSchema } from '../schemas/newsletter'
import { useSubscribe } from '../hooks/useSubscribe'
import { inputClass } from '../lib/styles'

function NewsletterForm() {
  const { mutate, isPending, isSuccess, isError, error } = useSubscribe()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '' },
  })

  function onSubmit(values) {
    mutate(values)
  }

  if (isSuccess) {
    return (
      <p className="flex items-center gap-2 rounded-lg border border-pixel/30 bg-pixel/10 px-4 py-3 text-sm text-pixel">
        <Check size={16} />
        عضویتت ثبت شد، ممنون!
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        ایمیل
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          dir="ltr"
          placeholder="you@example.com"
          className={`${inputClass(errors.email)} min-w-0 flex-1`}
          {...register('email')}
        />
        <button
          type="submit"
          disabled={isPending}
          className="shrink-0 rounded-lg bg-pixel px-4 text-sm font-bold text-ink transition hover:brightness-110 disabled:opacity-50"
        >
          عضویت
        </button>
      </div>
      {errors.email && <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>}
      {isError && <p className="mt-2 text-xs text-red-400">{error.message}</p>}
    </form>
  )
}

export default NewsletterForm