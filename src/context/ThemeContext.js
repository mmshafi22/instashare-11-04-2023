import React from 'react'

const ThemeContext = React.createContext({
  isDarkMode: false,
  category: 'Home',
  changeTheme: () => {},
  changeCategory: () => {},
})

export default ThemeContext
