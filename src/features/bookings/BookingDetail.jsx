import styled from 'styled-components'

import BookingDataBox from './BookingDataBox'
import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import Tag from '../../ui/Tag'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import { useMoveBack } from '../../hooks/useMoveBack'
import useBooking from './useBooking'
import Spinner from '../../ui/Spinner'
import { useNavigate } from 'react-router-dom'
import CheckoutButton from '../check-in-out/CheckoutButton'
import useDeleteBooking from './useDeleteBooking'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

function BookingDetail () {
  const { isLoading, booking } = useBooking()
  const { isDeleting, deleteBooking } = useDeleteBooking()
  const navigate = useNavigate()
  const moveBack = useMoveBack()

  if (isLoading) return <Spinner />
  if (!booking) navigate('/404', { replace: true })

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver'
  }

  function onDeletion () {
    deleteBooking(booking.id, {
      onSettled: () => {
        navigate(-1)
      }
    })
  }

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[booking.status]}>{booking.status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {
          booking.status === 'unconfirmed'
            ? <Button onClick={() => { navigate(`/checkin/${booking.id}`) }}>Check-In</Button>
            : null
        }
        {
          booking.status === 'checked-in'
            ? <CheckoutButton bookingId={booking.id}>Check-out</CheckoutButton>
            : null
        }

        <Button $variation='danger' onClick={onDeletion} disabled={isDeleting}>Remove</Button>

        <Button $variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default BookingDetail
