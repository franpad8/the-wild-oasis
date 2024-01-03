import { subDays } from 'date-fns'
import { useQuery } from '@tanstack/react-query'

import { getBookingsAfterDate as getBookingsAfterDateApi } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'

function useRecentBookings () {
  const [searchParams] = useSearchParams()
  const last = Number(searchParams.get('last')) || 7
  const queryDate = subDays(new Date(), last).toISOString()

  const { isLoading, data: recentBookings } = useQuery({
    queryFn: () => getBookingsAfterDateApi(queryDate),
    queryKey: [`recentBookings-${last}`]
  })

  return { isLoading, recentBookings }
}

export default useRecentBookings
