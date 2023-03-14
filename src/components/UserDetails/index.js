import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ThemeContext from '../../context/ThemeContext'
import Navbar from '../Navbar'
import './index.css'

const loadingStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class UserDetails extends Component {
  state = {userDetails: {}, loading: loadingStatus.inProgress}

  renderLoader = () => (
    <div className="user-loading-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderUserDetails = () => {
    const {loading} = this.state
    switch (loading) {
      case loadingStatus.inProgress:
        return this.renderLoader()
      case loadingStatus.failure:
        return this.renderFailurePage()
      case loadingStatus.success:
        return this.renderSuccessPage()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMode} = value
          return (
            <>
              <Navbar />
              <div className={isDarkMode ? 'user-bg-dark' : 'user-bg-light'}>
                {this.renderUserDetails()}
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default UserDetails
