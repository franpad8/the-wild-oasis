import Button from '../../ui/Button'
import useCheckout from './useCheckout'

function CheckoutButton ({ bookingId }) {
  const { isCheckingOut, checkout } = useCheckout()

  return (
    <Button onClick={() => checkout(bookingId)} $variation='primary' $size='small' disabled={isCheckingOut}>
      Check out
    </Button>
  )
}

export default CheckoutButton
