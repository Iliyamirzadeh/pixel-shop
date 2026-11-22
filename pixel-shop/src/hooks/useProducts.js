import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/products'

export function useProducts(params = {}){
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => getProducts(params),
        placeholderData: keepPreviousData,
    })
}