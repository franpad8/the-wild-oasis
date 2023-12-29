import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings'
import toast from 'react-hot-toast'

function useDeleteBooking () {
  const queryClient = useQueryClient()
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success('Booking successfully removed')
      queryClient.invalidateQueries({ active: true })
    },
    onError: () => toast.error('There was an error while deleting booking')
  })

  return { isDeleting, deleteBooking }
}

export default useDeleteBooking
