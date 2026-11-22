import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../api/auth'
import { useAuth } from './useAuth'

export function useLogin() {
  const { login } = useAuth()

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => login(user),
  })
}