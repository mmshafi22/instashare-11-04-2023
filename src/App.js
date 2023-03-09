import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import './App.css'

class App extends Component {
  state = {isDarkMode: false}

  changeTheme = () => {
    this.setState(prev => ({isDarkMode: !prev.isDarkMode}))
  }

  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    )
  }
}

export default App
