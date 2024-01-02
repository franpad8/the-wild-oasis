import styled from 'styled-components'
import HeaderMenu from './HeaderMenu'
import UserAvatar from '../features/authentication/UserAvatar'

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 4rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
  align-content: center;
`

const Header = () => {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  )
}

export default Header
