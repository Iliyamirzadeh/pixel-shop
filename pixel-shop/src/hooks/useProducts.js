import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/products'

export function useProducts(params = {}, select){
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => getProducts(params),
        placeholderData: keepPreviousData,
        select
    })
}