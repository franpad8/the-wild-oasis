import { useQuery } from '@tanstack/react-query'
import { getStaysTodayActivity as getStaysTodayActivityApi } from '../../services/apiBookings'

function useTodayActivity () {
  const { isLoading, data: todayActivity } = useQuery({
    queryFn: getStaysTodayActivityApi,
    queryKey: ['activity-today']
  })

  return { isLoading, todayActivity }
}

export default useTodayActivity
