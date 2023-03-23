import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ThemeContext from '../../context/ThemeContext'
import Navbar from '../Navbar'
import ProfileItem from '../ProfileItem'
import './index.css'

const profileStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class Profile extends Component {
  state = {profileList: {}, profileLoading: profileStatus.inProgress}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileLoading: profileStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/my-profile`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const each = data.profile
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
        profileList: formatData,
        profileLoading: profileStatus.success,
      })
    } else {
      this.setState({profileLoading: profileStatus.failure})
    }
  }

  renderProfileLoader = () => (
    <div className="profile-loading-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderProfileFailurePage = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        return (
          <div className="profile-loading-container">
            <img
              src="https://res.cloudinary.com/shafi-tech/image/upload/v1678789524/Group_7522_qi3cbr.png"
              alt="failure view"
              className="profile-failure-img"
            />
            <p
              className={
                isDarkMode ? 'profile-fail-dark' : 'profile-fail-light'
              }
            >
              Something Went Wrong. Please try again
            </p>
            <button
              className="profile-btn-try-again"
              type="button"
              onClick={() => this.getProfileDetails()}
            >
              Try again
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderProfileSuccessPage = () => {
    const {profileList} = this.state
    return <ProfileItem details={profileList} />
  }

  renderProfileDetails = () => {
    const {profileLoading} = this.state
    switch (profileLoading) {
      case profileStatus.inProgress:
        return this.renderProfileLoader()
      case profileStatus.failure:
        return this.renderProfileFailurePage()
      case profileStatus.success:
        return this.renderProfileSuccessPage()
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
              <div
                className={isDarkMode ? 'profile-bg-dark' : 'profile-bg-light'}
              >
                {this.renderProfileDetails()}
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Profile
