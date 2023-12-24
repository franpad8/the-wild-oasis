import styled from 'styled-components'
import Logo from './Logo'
import MainNav from './MainNav'

const StyledSidebar = styled.header`
  background-color: 1px solid var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  grid-row: 1 / -1;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  )
}

export default Sidebar
