import { RotateCw, TriangleAlert } from 'lucide-react'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface px-6 py-14 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-red-500/10 text-red-400">
        <TriangleAlert size={26} />
      </span>
      <p className="text-muted">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-lg bg-raised px-5 py-2.5 text-sm font-bold transition hover:bg-line"
        >
          <RotateCw size={16} />
          تلاش دوباره
        </button>
      )}
    </div>
  )
}

export default ErrorMessage