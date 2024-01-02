import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import ButtonIcon from './ui/ButtonIcon'
import { useDarkMode } from './contexts/DarkModeContext'
import { useEffect } from 'react'

function ToggleDarkMode () {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode')
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
      document.documentElement.classList.add('light-mode')
    }
  }, [isDarkMode])

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode
        ? <HiOutlineSun />
        : <HiOutlineMoon />}
    </ButtonIcon>
  )
}

export default ToggleDarkMode
