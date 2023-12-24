import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { removeCabin as deleteCabinApi } from '../../services/apiCabins'

function useDeleteCabin () {
  const queryClient = useQueryClient()

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Successfully deleted cabin')
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
    },
    onError: (err) => toast.error(err.message)
  })

  return { deleteCabin: mutate, isDeleting }
}

export default useDeleteCabin
