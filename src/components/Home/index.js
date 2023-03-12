import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {AiFillWarning} from 'react-icons/ai'
import ThemeContext from '../../context/ThemeContext'
import Navbar from '../Navbar'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
  ],
}

class Home extends Component {
  state = {
    storiesList: [],
    postsList: [],
    postStatus: apiStatus.initial,
    storiesStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getStories()
  }

  getStories = async () => {
    this.setState({storiesStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const usersStories = data.users_stories
      const formatData = usersStories.map(each => ({
        userId: each.user_id,
        userName: each.user_name,
        storyUrl: each.story_url,
      }))
      this.setState({
        storiesList: formatData,
        storiesStatus: apiStatus.success,
      })
    } else {
      this.setState({storiesStatus: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {storiesList} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMode} = value
          return (
            <Slider {...settings}>
              {storiesList.map(each => {
                const {userId, userName, storyUrl} = each
                return (
                  <Link
                    to={`/users/${userId}`}
                    className="home-link"
                    key={userId}
                  >
                    <div className="story-container">
                      <img src={storyUrl} alt="user story" />
                      <p
                        className={
                          isDarkMode ? 'story-dark-name' : 'story-light-name'
                        }
                      >
                        {userName}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </Slider>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {val => {
        const {isDarkMode} = val
        return (
          <div className="loader-container">
            <AiFillWarning color="#4094EF" size={22} />
            <h1
              className={
                isDarkMode ? 'error-dark-heading' : 'error-light-heading'
              }
            >
              Something Went Wrong. Please try again
            </h1>
            <button
              type="button"
              className="btn-try-again"
              onClick={() => this.getStories()}
            >
              Try Again
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderStoriesStatus = () => {
    const {storiesStatus} = this.state
    switch (storiesStatus) {
      case apiStatus.inProgress:
        return this.renderLoaderView()
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMode} = value
          const HomeBgColor = isDarkMode ? 'home-dark' : 'home-light'

          return (
            <>
              <Navbar />
              <div className={`home-bg-container ${HomeBgColor}`}>
                <div className="slick-container">
                  {this.renderStoriesStatus()}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
