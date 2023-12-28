import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constants'

const useBookings = () => {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const filterBy = searchParams.get('status') || 'all'
  const sortBy = searchParams.get('sortBy') || 'startDate-desc'
  const page = Number(searchParams.get('page') || 0)

  const filter = filterBy === 'all'
    ? null
    : { field: 'status', value: filterBy, compareFn: 'eq' }

  const [sortField, sortDirection] = sortBy.split('-')
  const sort = { field: sortField, direction: sortDirection }

  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ['bookings', filterBy, sortBy, page],
    queryFn: () => getBookings({ filter, sort, page }),
    retry: false
  })

  if ((page + 1) * PAGE_SIZE < count) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filterBy, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 })
    })
  }

  if (page > 0) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filterBy, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 })
    })
  }

  return { isLoading, bookings, count }
}

export default useBookings
