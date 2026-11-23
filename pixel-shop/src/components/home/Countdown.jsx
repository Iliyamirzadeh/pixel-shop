import { useEffect, useState } from 'react'

const CYCLE = 3 * 24 * 60 * 60 * 1000

function getRemaining() {
  const now = Date.now()
  const deadline = (Math.floor(now / CYCLE) + 1) * CYCLE
  const total = Math.floor((deadline - now) / 1000)

  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

const units = [
  { key: 'days', label: 'روز', color: 'border-pixel' },
  { key: 'hours', label: 'ساعت', color: 'border-violet' },
  { key: 'minutes', label: 'دقیقه', color: 'border-cyan' },
  { key: 'seconds', label: 'ثانیه', color: 'border-pixel' },
]

function Countdown() {
  const [remaining, setRemaining] = useState(getRemaining)

  useEffect(() => {
    const timer = setInterval(() => setRemaining(getRemaining()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-2">
      {units.map((unit, index) => (
        <div key={unit.key} className="flex items-center gap-2">
          {index > 0 && <span className="text-muted">:</span>}
          <div className={`min-w-16 border-t-2 bg-ink/60 px-3 py-2 text-center ${unit.color}`}>
            <p className="text-2xl font-black">
              {remaining[unit.key].toLocaleString('fa-IR', { minimumIntegerDigits: 2 })}
            </p>
            <p className="text-[11px] text-muted">{unit.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Countdown