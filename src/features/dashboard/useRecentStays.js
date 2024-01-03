import { subDays } from 'date-fns'
import { useQuery } from '@tanstack/react-query'

import { getStaysAfterDate as getStaysAfterDateApi } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'

function useRecentStays () {
  const [searchParams] = useSearchParams()
  const last = Number(searchParams.get('last')) || 7
  const queryDate = subDays(new Date(), last).toISOString()

  const { isLoading, data: recentStays } = useQuery({
    queryFn: () => getStaysAfterDateApi(queryDate),
    queryKey: [`recentStays-${last}`]
  })

  const confirmedStays = recentStays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  )

  return { isLoading, recentStays, confirmedStays, numDays: last }
}

export default useRecentStays
