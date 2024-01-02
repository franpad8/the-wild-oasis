import { createContext, useContext } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

const DarkModeContext = createContext()

function DarkModeProvider ({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'darkMode')

  function toggleDarkMode () {
    setIsDarkMode(value => !value)
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

function useDarkMode () {
  const context = useContext(DarkModeContext)
  if (!context) throw new Error('DarkModeContext was used outside of DarkModeProvider')

  return context
}

export { useDarkMode, DarkModeProvider }
