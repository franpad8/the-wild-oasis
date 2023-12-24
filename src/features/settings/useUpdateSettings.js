import { useMutation } from '@tanstack/react-query'
import { updateSetting as updateSettingApi } from '../../services/apiSettings'
import toast from 'react-hot-toast'

function useUpdateSettings () {
  const { isLoading: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Settings successfully updated')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  return { isUpdating, updateSettings }
}

export default useUpdateSettings
