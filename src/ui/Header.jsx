import styled from 'styled-components'
import Heading from './Heading'

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 4rem;
  border-bottom: 1px solid var(--color-grey-100)
`

const Header = () => {
  return (
    <StyledHeader>
      <Heading>Header</Heading>
    </StyledHeader>
  )
}

export default Header
