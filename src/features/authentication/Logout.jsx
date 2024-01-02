import { HiArrowRightOnRectangle } from 'react-icons/hi2'

import ButtonIcon from '../../ui/ButtonIcon'
import useLogout from './useLogout'

function Logout () {
  const { isLoggingOut, logout } = useLogout()

  return (
    <ButtonIcon disabled={isLoggingOut} onClick={logout}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  )
}

export default Logout
