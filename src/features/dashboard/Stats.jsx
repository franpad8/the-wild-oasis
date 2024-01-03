import { HiCalendarDays } from 'react-icons/hi2'
import Stat from './Stat'
import { useSearchParams } from 'react-router-dom'
import { formatCurrency } from '../../utils/helpers'

function Stats ({ recentBookings, confirmedStays, numCabins }) {
  const numBookings = recentBookings.length
  const numStays = confirmedStays.length
  const sales = formatCurrency(recentBookings.reduce((acc, b) => acc + b.totalPrice, 0))

  const [searchParams] = useSearchParams()
  const last = Number(searchParams.get('last')) || 7
  const numNights = numCabins * last

  const numOccupiedNights = confirmedStays.reduce((acc, booking) => acc + booking.numNights, 0)
  const occupation = Math.round((numOccupiedNights / numNights) * 100)

  return (
    <>
      <Stat icon={<HiCalendarDays />} title='bookings' value={numBookings} color='blue' />
      <Stat icon={<HiCalendarDays />} title='Sales' value={sales} color='green' />
      <Stat icon={<HiCalendarDays />} title='Check ins' value={numStays} color='indigo' />
      <Stat icon={<HiCalendarDays />} title='Occupancy rate' value={`${occupation} %`} color='yellow' />
    </>
  )
}

export default Stats
