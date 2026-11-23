import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, Gamepad2, LogOut, Menu, ShoppingCart, X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import { useCategories } from '../hooks/useCategories'
import { categoryIcons } from '../lib/categoryIcons'
import SearchBox from './SearchBox'

const mainLinks = [
  { to: '/', label: 'خانه', end: true },
  { to: '/products', label: 'محصولات', end: true },
]

function navClass({ isActive }) {
  return `rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-raised text-pixel' : 'text-muted hover:text-snow'
  }`
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const { totalCount } = useCart()
  const { data: categories } = useCategories()

  function closeMenu() {
    setOpen(false)
  }

  function handleLogout() {
    logout()
    closeMenu()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-md bg-pixel text-ink">
            <Gamepad2 size={18} strokeWidth={2.5} />
          </span>
          <span className="font-black">پیکسل شاپ</span>
        </Link>

        <div className="hidden flex-1 justify-center lg:flex">
          <nav className="flex items-center gap-1 rounded-lg border border-line bg-surface p-1">
            {mainLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={navClass}>
                {link.label}
              </NavLink>
            ))}

            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium text-muted transition-colors group-focus-within:text-snow group-hover:text-snow"
              >
                دسته‌بندی‌ها
                <ChevronDown
                  size={14}
                  className="transition-transform group-focus-within:rotate-180 group-hover:rotate-180"
                />
              </button>

              <div className="invisible absolute start-0 top-full z-50 w-64 pt-3 opacity-0 transition duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="rounded-xl border border-line bg-surface p-2 shadow-2xl shadow-black/50">
                  {categories?.map((category) => {
                    const Icon = categoryIcons[category.slug] ?? Gamepad2
                    return (
                      <Link
                        key={category.id}
                        to={`/products?category=${category.slug}`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-raised hover:text-snow"
                      >
                        <Icon size={18} className="text-pixel" />
                        {category.title}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="ms-auto flex items-center gap-1.5 lg:ms-0">
          <SearchBox className="me-1 hidden w-56 lg:block" />

          <Link
            to="/cart"
            aria-label="سبد خرید"
            className="relative grid size-9 place-items-center rounded-lg transition-colors hover:bg-raised"
          >
            <ShoppingCart size={19} />
            {totalCount > 0 && (
              <span className="absolute -end-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-pixel px-1 text-[10px] font-black leading-4 text-ink">
                {totalCount.toLocaleString('fa-IR')}
              </span>
            )}
          </Link>
          {user ? (
            <div className="hidden items-center gap-1 lg:flex">
              <span
                title={user.name}
                className="grid size-8 place-items-center rounded-full border border-line bg-surface text-xs font-bold text-pixel"
              >
                {user.name.charAt(0)}
              </span>
              <button
                onClick={logout}
                aria-label="خروج"
                className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-raised hover:text-red-400"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-md bg-pixel px-4 py-1.5 text-sm font-bold text-ink transition hover:brightness-110 lg:block"
            >
              ورود
            </Link>
          )}

          <button
            onClick={() => setOpen(!open)}
            aria-label="منو"
            className="grid size-9 place-items-center rounded-lg transition-colors hover:bg-raised lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line px-4 py-4 lg:hidden">
          <SearchBox onSearch={closeMenu} className="mb-4" />

          <div className="flex flex-col gap-1">
            {mainLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={closeMenu}
                className={navClass}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <p className="mb-2 mt-5 px-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Categories
          </p>
          <div className="grid grid-cols-2 gap-2">
            {categories?.map((category) => {
              const Icon = categoryIcons[category.slug] ?? Gamepad2
              return (
                <Link
                  key={category.id}
                  to={`/products?category=${category.slug}`}
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2.5 text-sm transition-colors hover:border-pixel/50"
                >
                  <Icon size={16} className="text-pixel" />
                  {category.title}
                </Link>
              )
            })}
          </div>

          {user ? (
            <button
              onClick={handleLogout}
              className="mt-5 w-full rounded-lg border border-line px-4 py-2.5 text-sm font-bold text-red-400"
            >
              خروج ({user.name})
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="mt-5 block rounded-lg bg-pixel px-4 py-2.5 text-center text-sm font-bold text-ink"
            >
              ورود
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}

export default Navbar