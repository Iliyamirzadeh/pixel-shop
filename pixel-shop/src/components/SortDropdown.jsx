import { useEffect, useRef, useState } from 'react'
import { ArrowUpDown, Check, ChevronDown } from 'lucide-react'

function SortDropdown({ value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const current = options.find((option) => option.value === value) ?? options[0]

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event) {
      if (!containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  function handleSelect(nextValue) {
    onChange(nextValue)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative sm:w-60">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm transition-colors hover:border-pixel/50 focus-visible:border-pixel focus-visible:outline-none"
      >
        <span className="flex items-center gap-2">
          <ArrowUpDown size={16} className="text-pixel" />
          {current.label}
        </span>
        <ChevronDown
          size={16}
          className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute start-0 top-full z-30 mt-2 w-full overflow-hidden rounded-xl border border-line bg-surface p-1.5 shadow-2xl shadow-black/50"
        >
          {options.map((option) => {
            const active = option.value === value

            return (
              <li key={option.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    active ? 'bg-raised text-pixel' : 'text-muted hover:bg-raised hover:text-snow'
                  }`}
                >
                  {option.label}
                  {active && <Check size={16} />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default SortDropdown