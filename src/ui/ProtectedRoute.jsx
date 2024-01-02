import { useNavigate } from 'react-router-dom'
import useCurrentUser from '../features/authentication/useCurrentUser'

import Spinner from '../ui/Spinner'
import { useEffect } from 'react'

function ProtectedRoute ({ children }) {
  const navigate = useNavigate()
  // Get current session
  const { isLoading, isAuthenticated } = useCurrentUser()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login')
  }, [isAuthenticated, navigate, isLoading])

  if (isLoading) return <Spinner />

  return children
}

export default ProtectedRoute
