import React from 'react'

const ThemeContext = React.createContext({
  isDarkMode: false,
  category: 'Home',
  isFocused: false,
  searchInput: '',
  searchList: [],
  onClickLike: () => {},
  getSearchResults: () => {},
  changeFocus: () => {},
  changeTheme: () => {},
  changeCategory: () => {},
  onChangeUsername: () => {},
})

export default ThemeContext
