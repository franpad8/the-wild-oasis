import { useQuery } from '@tanstack/react-query'
import { getSettings as getSettingsApi } from '../../services/apiSettings'

function useSettings () {
  const {
    isLoading, data: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice
    } = {}
  } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettingsApi
  })

  return { isLoading, minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice }
}

export default useSettings
