import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <p className="text-8xl font-black text-pixel">۴۰۴:(</p>
      <p className="mt-4 text-muted">صفحه‌ای که دنبالش بودی پیدا نشد</p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-pixel px-6 py-3 font-bold text-ink transition hover:brightness-110"
      >
        بازگشت به خانه
      </Link>
    </div>
  )
}

export default NotFound