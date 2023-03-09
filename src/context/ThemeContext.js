import React from 'react'

const ThemeContext = React.createContext({
  isDarkMode: false,
  changeTheme: () => {},
})

export default ThemeContext
