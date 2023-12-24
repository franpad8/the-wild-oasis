import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createCabin as createCabinApi } from '../../services/apiCabins'

function useCreateUpdateCabin ({ isEditSession = false }) {
  const queryClient = useQueryClient()

  const { isLoading: isProcessing, mutate: createUpdateCabin } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      const message = isEditSession
        ? 'Cabin successfully updated'
        : 'New cabin successfully created'
      toast.success(message)
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  return { isProcessing, createUpdateCabin }
}

export default useCreateUpdateCabin
