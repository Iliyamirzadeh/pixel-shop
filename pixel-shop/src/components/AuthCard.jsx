import { Gamepad2 } from 'lucide-react'

function AuthCard({ title, subtitle, children }) {
  return (
    <div className="mx-auto max-w-md py-6">
      <div className="pixel-grid relative overflow-hidden rounded-3xl border border-line bg-surface p-8">
        <div className="absolute -start-16 -top-16 size-48 rounded-full bg-violet/20 blur-3xl" />
        <div className="relative">
          <span className="grid size-12 place-items-center rounded-xl bg-pixel text-ink">
            <Gamepad2 size={26} strokeWidth={2.5} />
          </span>
          <h1 className="mt-6 text-2xl font-black">{title}</h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AuthCard