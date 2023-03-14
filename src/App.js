import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import ThemeContext from './context/ThemeContext'
import Login from './components/Login'
import UserDetails from './components/UserDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './components/Profile'
import SearchPage from './components/SearchPage'
import Home from './components/Home'
import './App.css'

class App extends Component {
  state = {isDarkMode: false, category: 'Home'}

  changeTheme = () => {
    this.setState(prev => ({isDarkMode: !prev.isDarkMode}))
  }

  changeCategory = text => {
    this.setState({category: text})
  }

  render() {
    const {isDarkMode, category} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isDarkMode,
          category,
          changeTheme: this.changeTheme,
          changeCategory: this.changeCategory,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={Profile} />
          <ProtectedRoute exact path="/search" component={SearchPage} />
          <ProtectedRoute exact path="/users/:id" component={UserDetails} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
