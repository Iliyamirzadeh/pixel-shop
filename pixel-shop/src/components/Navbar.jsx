import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Gamepad2, Menu, ShoppingCart, X } from 'lucide-react'

const links = [
    { to: '/', label: 'خانه', end: true },
    { to: '/products', label: 'محصولات' },
]

function linkClass({ isActive }) {
    return `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        isActive ? 'bg-raised text-pixel' : 'text-muted hover:text-snow'
    }`
}

function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-lg">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center rounded-lg bg-pixel text-ink">
                        <Gamepad2 size={20} strokeWidth={2.5} />
                    </span>
                    <span className="text-lg font-black">پیکسل شاپ</span>
                </Link>

                <nav className="hidden items-center gap-1 md:flex">
                    {links.map((link) => (
                        <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <Link
                        to="/cart"
                        aria-label="سبد خرید"
                        className="grid size-10 place-items-center rounded-lg transition-colors hover:bg-raised"
                    >
                        <ShoppingCart size={20} />
                    </Link>
                    <Link
                        to="/login"
                        className="hidden rounded-lg bg-pixel px-4 py-2 text-sm font-bold text-ink transition hover:brightness-110 md:block"
                    >
                        ورود
                    </Link>
                    <button
                        onClick={() => setOpen(!open)}
                        aria-label="منو"
                        className="grid size-10 place-items-center rounded-lg transition-colors hover:bg-raised md:hidden"
                    >
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {open && (
                <nav className="flex flex-col gap-1 border-t border-line px-4 py-3 md:hidden">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            onClick={() => setOpen(false)}
                            className={linkClass}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="mt-1 rounded-lg bg-pixel px-4 py-2 text-center text-sm font-bold text-ink"
                    >
                        ورود
                    </Link>
                </nav>
            )}
        </header>
    )
}

export default Navbar