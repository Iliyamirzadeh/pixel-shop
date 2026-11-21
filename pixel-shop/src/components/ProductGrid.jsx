import { useProducts } from '../hooks/useProducts'
import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'
import ErrorMessage from './ErrorMessage'

const gridClass = 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'

function ProductGrid({ params, skeletonCount = 8 }) {
  const { data, isPending, isError, error, refetch } = useProducts(params)

  if (isPending) {
    return (
      <div className={gridClass}>
        {Array.from({ length: skeletonCount }).map((index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (isError) {
    return <ErrorMessage message={error.message} onRetry={refetch} />
  }

  if (data.length === 0) {
    return <p className="py-16 text-center text-muted">محصولی پیدا نشد</p>
  }

  return (
    <div className={gridClass}>
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid