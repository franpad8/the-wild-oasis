import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout as logoutApi } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function useLogout () {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { isLoading: isLoggingOut, mutate: logout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries()
      navigate('/login', { replace: true })
    },
    onError: () => {
      toast.error('Error while logging out')
    }
  })

  return { isLoggingOut, logout }
}

export default useLogout
