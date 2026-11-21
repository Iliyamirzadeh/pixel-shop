function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="aspect-[4/3] bg-raised" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-16 rounded bg-raised" />
        <div className="h-4 w-3/4 rounded bg-raised" />
        <div className="h-3 w-24 rounded bg-raised" />
        <div className="h-5 w-32 rounded bg-raised" />
      </div>
    </div>
  )
}

export default ProductCardSkeleton