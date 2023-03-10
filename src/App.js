import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import ThemeContext from './context/ThemeContext'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import './App.css'

class App extends Component {
  state = {isDarkMode: false}

  changeTheme = () => {
    this.setState(prev => ({isDarkMode: !prev.isDarkMode}))
  }

  render() {
    const {isDarkMode} = this.state
    return (
      <ThemeContext.Provider
        value={{isDarkMode, changeTheme: this.changeTheme}}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
