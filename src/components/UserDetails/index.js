import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ThemeContext from '../../context/ThemeContext'
import Navbar from '../Navbar'
import UserItem from '../UserItem'
import './index.css'

const loadingStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class UserDetails extends Component {
  state = {userDetailsList: {}, loading: loadingStatus.inProgress}

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    this.setState({loading: loadingStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const each = data.user_details
      const formatData = {
        id: each.id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        followersCount: each.followers_count,
        followingCount: each.following_count,
        userBio: each.user_bio,
        postsCount: each.posts_count,
        posts: each.posts,
        stories: each.stories,
      }
      this.setState({
        userDetailsList: formatData,
        loading: loadingStatus.success,
      })
    } else {
      this.setState({loading: loadingStatus.failure})
    }
  }

  renderLoader = () => (
    <div className="user-loading-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailurePage = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        return (
          <div className="user-loading-container">
            <img
              src="https://res.cloudinary.com/shafi-tech/image/upload/v1678789524/Group_7522_qi3cbr.png"
              alt="failure view"
              className="failure-img"
            />
            <p className={isDarkMode ? 'fail-dark' : 'fail-light'}>
              Something Went Wrong. Please try again
            </p>
            <button
              className="user-btn-try-again"
              type="button"
              onClick={() => this.getUserDetails()}
            >
              Try again
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderSuccessPage = () => {
    const {userDetailsList} = this.state
    return <UserItem details={userDetailsList} />
  }

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
