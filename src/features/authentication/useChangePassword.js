import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { changePassword as changePasswordApi } from '../../services/apiAuth'

function useChangePassword () {
  const { isLoading: isChangingPassword, mutate: changePassword } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      toast.success('User password successfully changed')
    },
    onError: () => toast.error('Error while changing user password')
  })

  return { isChangingPassword, changePassword }
}

export default useChangePassword
