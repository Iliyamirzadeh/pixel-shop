import { Gamepad2 } from 'lucide-react'
import { categoryIcons } from '../lib/categoryIcons'

function ProductVisual({ product, large = false }) {
  const Icon = categoryIcons[product.category] ?? Gamepad2

  return (
    <div className="pixel-grid relative grid aspect-[4/3] place-items-center overflow-hidden bg-ink">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 45%, ${product.accent}45, transparent 70%)`,
        }}
      />
      <span
        className={`relative grid place-items-center rounded-2xl border bg-ink/60 backdrop-blur transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110 ${
          large ? 'size-40' : 'size-24'
        }`}
        style={{ color: product.accent, borderColor: `${product.accent}55` }}
      >
        <Icon size={large ? 72 : 44} strokeWidth={1.5} />
      </span>
    </div>
  )
}

export default ProductVisual