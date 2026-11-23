import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function SectionHeading({ tag, title, to, linkLabel }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-pixel">
          <span className="size-1.5 bg-pixel" />
          {tag}
        </p>
        <h2 className="mt-3 text-2xl font-black md:text-3xl">{title}</h2>
      </div>

      {to && (
        <Link
          to={to}
          className="flex shrink-0 items-center gap-1.5 text-sm text-muted transition-colors hover:text-pixel"
        >
          {linkLabel}
          <ArrowLeft size={16} />
        </Link>
      )}
    </div>
  )
}

export default SectionHeading