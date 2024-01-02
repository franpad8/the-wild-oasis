import { useMutation } from '@tanstack/react-query'
import { signUp as signUpApi } from '../../services/apiAuth'
import toast from 'react-hot-toast'

function useSignup () {
  const { isLoading: isSigningUp, mutate: signUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success('Account successully created! Please verify the new account from the user\'s email address.')
    },
    onError: () => {
      toast.error('Error while creating account.')
    }
  })

  return { isSigningUp, signUp }
}

export default useSignup
