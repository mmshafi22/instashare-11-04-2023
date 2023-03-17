import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    inputType: true,
  }

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (username !== '' && password === '') {
      this.setState({errorMsg: 'Enter the password'})
    } else if (username === '' && password !== '') {
      this.setState({errorMsg: 'Enter the username'})
    } else if (username === '' && password === '') {
      this.setState({errorMsg: 'Enter username & Password'})
    } else if (username !== '' && password !== '') {
      if (response.ok === true) {
        this.onSuccessLogin(data.jwt_token)
      } else {
        this.setState({errorMsg: data.error_msg, username: '', password: ''})
      }
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onCheckBox = () => {
    this.setState(prev => ({inputType: !prev.inputType}))
  }

  render() {
    const {inputType, username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMode} = value
          const bgLogin = isDarkMode ? 'login-dark' : 'login-light'
          const color = isDarkMode ? 'text-dark' : 'text-light'
          return (
            <div className={`login-bg ${bgLogin}`}>
              <div className="login-card">
                <img
                  src="https://res.cloudinary.com/shafi-tech/image/upload/v1678348568/OBJECTS_bovlwz.png"
                  alt="website login"
                  className="login-img"
                />
                <form className="login-form" onSubmit={this.onSubmitForm}>
                  <img
                    src="https://res.cloudinary.com/shafi-tech/image/upload/v1678364614/Group_fnwezk.png"
                    alt="website logo"
                    className="login-logo"
                  />
                  <h1 className={`login-heading ${color}`}>Insta Share</h1>
                  <label className={`label-text ${color}`} htmlFor="username">
                    USERNAME
                  </label>
                  <input
                    value={username}
                    type="text"
                    id="username"
                    className="text-light"
                    onChange={this.onChangeUsername}
                  />
                  <label className={`label-text ${color}`} htmlFor="password">
                    PASSWORD
                  </label>
                  <input
                    type={inputType ? 'password' : 'text'}
                    value={password}
                    id="password"
                    className="text-light"
                    onChange={this.onChangePassword}
                  />
                  {errorMsg.length !== 0 ? (
                    <p className="error-msg">*{errorMsg}</p>
                  ) : (
                    <p>{errorMsg}</p>
                  )}
                  <button type="submit" className="btn-login">
                    Login
                  </button>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="check-box"
                      onChange={this.onCheckBox}
                    />
                    <label
                      htmlFor="checkbox"
                      className={`label-check ${color}`}
                    >
                      Show Password
                    </label>
                  </div>
                </form>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
