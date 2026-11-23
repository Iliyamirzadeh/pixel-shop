import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

function SearchBox({ className = '', onSearch }) {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const text = value.trim()
    if (!text) return

    navigate(`/products?q=${encodeURIComponent(text)}`)
    setValue('')
    onSearch?.()
  }

  return (
    <form onSubmit={handleSubmit} role="search" className={`relative ${className}`}>
      <Search
        size={16}
        className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-muted"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="جستجوی محصول..."
        aria-label="جستجوی محصول"
        className="w-full rounded-lg border border-line bg-surface py-2 pe-3 ps-10 text-sm outline-none transition-colors placeholder:text-muted focus:border-pixel"
      />
    </form>
  )
}

export default SearchBox