import { useMutation } from '@tanstack/react-query'
import { registerUser } from '../api/auth'
import { useAuth } from './useAuth'

export function useRegister() {
  const { login } = useAuth()

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => login(user),
  })
}