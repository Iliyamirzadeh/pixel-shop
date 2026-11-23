import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function RequireAuth() {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    const redirect = encodeURIComponent(location.pathname)
    return <Navigate to={`/login?redirect=${redirect}`} replace />
  }

  return <Outlet />
}

export default RequireAuth