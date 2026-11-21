import ProductGrid from '../components/ProductGrid'

function Products() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black">همه‌ی محصولات</h1>
        <p className="mt-2 text-muted">بهترین تجهیزات گیمینگ، با ضمانت اصالت کالا</p>
      </div>
      <ProductGrid />
    </div>
  )
}

export default Products