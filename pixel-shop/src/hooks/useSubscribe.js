import { useMutation } from '@tanstack/react-query'
import { subscribe } from '../api/newsletter'

export function useSubscribe() {
  return useMutation({
    mutationFn: subscribe,
  })
}