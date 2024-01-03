import styled from 'styled-components'
import DashboardBox from './DashboardBox'
import { AreaChart, CartesianGrid, Area, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import Heading from '../../ui/Heading'
import { useDarkMode } from '../../contexts/DarkModeContext'
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns'

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`

function SalesChart ({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode()

  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f'
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff'
      }

  const allDays = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date()
  })

  const data = allDays.map(date => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings
        .filter(b => isSameDay(new Date(b.created_at), date))
        .reduce((acc, b) => acc + b.totalPrice, 0),

      extrasSales: bookings
        .filter(b => isSameDay(new Date(b.created_at), date))
        .reduce((acc, b) => acc + b.extrasPrice, 0)
    }
  })

  return (
    <StyledSalesChart>
      <Heading as='h2'>Sales</Heading>
      <ResponsiveContainer height={250} width='100%'>
        <AreaChart data={data}>
          <XAxis dataKey='label' tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
          <YAxis unit='$' tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <CartesianGrid strokeDasharray='4' />
          <Area
            dataKey='totalSales'
            type='monotone'
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name='Total Sales'
            unit='$'
          />
          <Area
            dataKey='extrasSales'
            type='monotone'
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name='Extras Sales'
            unit='$'
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  )
}

export default SalesChart
