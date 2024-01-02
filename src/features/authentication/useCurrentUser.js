import { useQuery } from '@tanstack/react-query'
import { getCurrentUser as getCurrentUserApi } from '../../services/apiAuth'

export default function useCurrentUser () {
  const { isLoading, data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUserApi
  })

  return { isLoading, isAuthenticated: currentUser?.role === 'authenticated', currentUser }
}
