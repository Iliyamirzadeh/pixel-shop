import { Link } from 'react-router-dom'

function Logo({ className = 'h-9' }) {
  return (
    <Link to="/" className="inline-flex shrink-0 items-center">
      <img src="/logo.png" alt="پیکسل شاپ" className={`w-auto ${className}`} />
    </Link>
  )
}

export default Logo