import { useQuery } from '@tanstack/react-query'
import { getBooking } from '../../services/apiBookings'
import { useParams } from 'react-router-dom'

function useBooking () {
  const { id } = useParams()
  const { isLoading, data: booking } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBooking(id),
    retry: false
  })

  return { isLoading, booking }
}

export default useBooking
