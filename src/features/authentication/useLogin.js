import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginUser as loginUserApi } from '../../services/apiAuth'
import toast from 'react-hot-toast'

function useLogin () {
  const queryClient = useQueryClient()

  const { isLoading, mutate: loginUser } = useMutation({
    mutationFn: loginUserApi,
    onSuccess (data) {
      queryClient.setQueryData(['currentUser'], data?.user)
      toast.success('User successfully logged in')
    },
    onError () {
      toast.error('Email or password are incorrect')
    }
  })
  return { isLoading, loginUser }
}

export default useLogin
