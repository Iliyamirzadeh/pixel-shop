import { useQuery } from '@tanstack/react-query'
import { getProduct } from '../api/products'

export function useProduct(id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    retry: (failureCount, error) => error.status !== 404 && failureCount < 1,
  })
}