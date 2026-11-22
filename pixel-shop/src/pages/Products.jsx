import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useCategories } from '../hooks/useCategories'
import { useDebounce } from '../hooks/useDebounce'
import ProductGrid from '../components/ProductGrid'

const sortMap = {
  'price-asc': { _sort: 'price', _order: 'asc' },
  'price-desc': { _sort: 'price', _order: 'desc' },
  rating: { _sort: 'rating', _order: 'desc' },
  popular: { _sort: 'reviews', _order: 'desc' },
}

function pillClass(active) {
  return `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
    active
      ? 'border-pixel bg-pixel text-ink'
      : 'border-line bg-surface text-muted hover:border-pixel/50 hover:text-snow'
  }`
}

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: categories } = useCategories()

  const category = searchParams.get('category') || undefined
  const sort = searchParams.get('sort') || ''
  const query = searchParams.get('q') || undefined

  const [search, setSearch] = useState(query ?? '')
  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    if ((searchParams.get('q') ?? '') === debouncedSearch) return

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (debouncedSearch) {
          next.set('q', debouncedSearch)
        } else {
          next.delete('q')
        }
        return next
      },
      { replace: true }
    )
  }, [debouncedSearch, searchParams, setSearchParams])

  function updateParam(key, value) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value) {
        next.set(key, value)
      } else {
        next.delete(key)
      }
      return next
    })
  }

  const params = { category, q: query, ...sortMap[sort] }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">همه‌ی محصولات</h1>
        <p className="mt-2 text-muted">بهترین تجهیزات گیمینگ، با ضمانت اصالت کالا</p>
      </div>

      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="جستجوی محصول یا برند..."
              className="w-full rounded-xl border border-line bg-surface py-3 pe-4 ps-11 text-sm outline-none transition-colors placeholder:text-muted focus:border-pixel"
            />
          </div>
          <select
            value={sort}
            onChange={(event) => updateParam('sort', event.target.value)}
            className="rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-pixel"
          >
            <option value="">مرتب‌سازی پیش‌فرض</option>
            <option value="popular">پربازدیدترین</option>
            <option value="rating">بیشترین امتیاز</option>
            <option value="price-asc">ارزان‌ترین</option>
            <option value="price-desc">گران‌ترین</option>
          </select>
        </div>

        {categories && (
          <div className="flex flex-wrap gap-2">
            <button onClick={() => updateParam('category', '')} className={pillClass(!category)}>
              همه
            </button>
            {categories.map((item) => (
              <button
                key={item.id}
                onClick={() => updateParam('category', item.slug)}
                className={pillClass(category === item.slug)}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
      </div>

      <ProductGrid params={params} />
    </div>
  )
}

export default Products