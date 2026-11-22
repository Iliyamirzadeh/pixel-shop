import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import ProductVisual from './ProductVisual'
import { formatPrice } from '../lib/format'

function ProductCard({ product }) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0

  return (
    <Link
      to={`/products/${product.id}`}
      className="group overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-pixel/50"
    >
      <div className="relative">
        <ProductVisual product={product} />
        {discount > 0 && (
          <span className="absolute start-3 top-3 rounded-md bg-pixel px-2 py-1 text-xs font-black text-ink">
            {discount.toLocaleString('fa-IR')}٪ تخفیف
          </span>
        )}
      </div>

      <div className="space-y-2 p-4">
        <p className="text-xs font-medium tracking-wider text-muted">{product.brand}</p>
        <h3 className="line-clamp-1 font-bold">{product.title}</h3>

        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-muted">
            <Star size={14} className="fill-pixel text-pixel" />
            {product.rating.toLocaleString('fa-IR')}
            <span>({product.reviews.toLocaleString('fa-IR')})</span>
          </span>
          {product.stock <= 5 && (
            <span className="text-amber-400">
              تنها {product.stock.toLocaleString('fa-IR')} عدد مانده
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-lg font-black">{formatPrice(product.price)}</span>
          <span className="text-xs text-muted">تومان</span>
          {product.oldPrice && (
            <span className="ms-auto text-xs text-muted line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard