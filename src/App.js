import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import ThemeContext from './context/ThemeContext'
import Login from './components/Login'
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
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
