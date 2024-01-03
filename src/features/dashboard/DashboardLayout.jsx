import styled from 'styled-components'

import useRecentBookings from './useRecentBookings'

import Spinner from '../../ui/Spinner'
import useRecentStays from './useRecentStays'
import Stats from './Stats'
import { useQuery } from '@tanstack/react-query'
import { getCabins } from '../../services/apiCabins'
import SalesChart from './SalesChart'
import DurationChart from './DurationChart'
import TodayActivity from '../check-in-out/TodayActivity'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

function DashboardLayout () {
  const { isLoading: isLoading1, recentBookings } = useRecentBookings()
  const { isLoading: isLoading2, confirmedStays, numDays } = useRecentStays()
  const { isLoading: isLoading3, data: cabins } = useQuery(['cabins'], getCabins)

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats recentBookings={recentBookings} confirmedStays={confirmedStays} numCabins={cabins.length} />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
