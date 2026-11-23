import { formatPrice } from '../lib/format'

function OrderItems({ items }) {
  return (
    <ul className="divide-y divide-line">
      {items.map((item) => (
        <li key={item.id} className="flex items-center justify-between gap-3 py-3 text-sm">
          <span className="min-w-0 flex-1 truncate">
            {item.title}
            <span className="ms-2 text-muted">× {item.quantity.toLocaleString('fa-IR')}</span>
          </span>
          <span className="shrink-0 font-bold">{formatPrice(item.price * item.quantity)}</span>
        </li>
      ))}
    </ul>
  )
}

export default OrderItems