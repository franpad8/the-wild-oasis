import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateUserData as updateUserDataApi } from '../../services/apiAuth'

function useUpdateUserData () {
  const queryClient = useQueryClient()

  const { isLoading: isUpdatingUserData, mutate: updateUserData } = useMutation({
    mutationFn: ({ email, fullName, avatar }) => updateUserDataApi({ email, fullName, avatar }),
    onSuccess: () => {
      queryClient.invalidateQueries(['currentUser'])
      toast.success('User data successfully updated')
    },
    onError: () => toast.error('Error while updating user data')
  })

  return { isUpdatingUserData, updateUserData }
}

export default useUpdateUserData
