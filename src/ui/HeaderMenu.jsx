import { HiUserCircle } from 'react-icons/hi2'
import ButtonIcon from './ButtonIcon'
import Logout from '../features/authentication/Logout'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import ToggleDarkMode from '../ToggleDarkMode'

const StyledHeaderMenu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

function HeaderMenu () {
  const navigate = useNavigate()

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}><HiUserCircle /></ButtonIcon>
      </li>
      <li>
        <ToggleDarkMode />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu
