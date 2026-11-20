import { useParams } from 'react-router-dom'

function ProductDetail() {
  const { id } = useParams()

  return <h1 className="text-3xl font-black">جزئیات محصول شماره {id}</h1>
}

export default ProductDetail