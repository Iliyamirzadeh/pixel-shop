import { useQuery } from '@tanstack/react-query'
import { getOrder } from '../api/orders'

export function useOrder(id) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrder(id),
    retry: (failureCount, error) => error.status !== 404 && failureCount < 1,
  })
}