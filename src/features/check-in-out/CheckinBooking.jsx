import styled from 'styled-components'
import BookingDataBox from '../../features/bookings/BookingDataBox'

import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'
import Checkbox from '../../ui/Checkbox'

import { useMoveBack } from '../../hooks/useMoveBack'
import useBooking from '../bookings/useBooking'
import Spinner from '../../ui/Spinner'
import { useState } from 'react'
import useCheckin from './useCheckin'
import useSettings from '../settings/useSettings'
import { formatCurrency } from '../../utils/helpers'

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

function CheckinBooking () {
  const [approvedPayment, setApprovedPayment] = useState(false)
  const [breakfastIncluded, setBreakfastIncluded] = useState(false)
  const { isCheckingIn, checkin } = useCheckin()
  const moveBack = useMoveBack()
  const { booking, isLoading } = useBooking()
  const { breakfastPrice } = useSettings()

  if (isLoading) return <Spinner />

  const {
    id: bookingId,
    // guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights
  } = booking

  const extrasPrice = breakfastPrice * numGuests * numNights

  function handleCheckin () {
    checkin({
      bookingId,
      hasBreakfast: breakfastIncluded,
      totalPrice: totalPrice + (breakfastIncluded ? extrasPrice : 0),
      extrasPrice: breakfastIncluded ? extrasPrice : 0
    })
  }
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {
      !hasBreakfast &&
        <Box>
          <Checkbox
            checked={breakfastIncluded}
            onChange={() => { setBreakfastIncluded(included => !included) }}
            disabled={breakfastIncluded}
          >Want to include breakfast for an additional {formatCurrency(extrasPrice)}?
          </Checkbox>
        </Box>
      }

      <Row type='horizontal'>
        <Box>
          <Checkbox
            checked={approvedPayment}
            onChange={() => setApprovedPayment(approbed => !approbed)}
            disabled={approvedPayment}
          >Approve payment of {formatCurrency(totalPrice + (breakfastIncluded ? extrasPrice : 0))} {' '}
            {breakfastIncluded ? `(${formatCurrency(totalPrice)} + ${formatCurrency(extrasPrice)})` : ''}
          </Checkbox>
        </Box>
        <ButtonGroup>
          <Button
            onClick={handleCheckin}
            disabled={!approvedPayment || isLoading || isCheckingIn}
          >Check in booking #{bookingId}
          </Button>
          <Button $variation='secondary' onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </Row>

    </>
  )
}

export default CheckinBooking
