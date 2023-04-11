import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import ThemeContext from '../../context/ThemeContext'
import Navbar from '../Navbar'
import SearchPage from '../SearchPage'
import PostItem from '../PostItem'
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
        slidesToShow: 5,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
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
    this.getPosts()
  }

  getPosts = async () => {
    this.setState({postStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const {posts} = data
      const updatedData = posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postDetails: {
          imageUrl: each.post_details.image_url,
          caption: each.post_details.caption,
        },
        likesCount: each.likes_count,
        comments: each.comments.map(item => ({
          userName: item.user_name,
          userId: item.user_id,
          comment: item.comment,
        })),
        createdAt: each.created_at,
        likeStatus: false,
      }))
      this.setState({postsList: updatedData, postStatus: apiStatus.success})
    } else {
      this.setState({postStatus: apiStatus.failure})
    }
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

  likeThePost = async id => {
    const {postsList} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const obj = postsList.find(each => each.postId === id)
    const status = {like_status: !obj.likeStatus}
    const url = `https://apis.ccbp.in/insta-share/posts/${id}/like`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(status),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (data.message === 'Post has been liked') {
      this.setState(prev => ({
        postsList: prev.postsList.map(item =>
          item.postId === id
            ? {...item, likeStatus: true, likesCount: item.likesCount + 1}
            : {...item},
        ),
      }))
    } else {
      this.setState(prev => ({
        postsList: prev.postsList.map(item =>
          item.postId === id
            ? {...item, likeStatus: false, likesCount: item.likesCount - 1}
            : {...item},
        ),
      }))
    }
  }

  renderSuccessView = () => {
    const {storiesList} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMode, changeCategory} = value
          return (
            <Slider {...settings}>
              {storiesList.map(each => {
                const {userId, userName, storyUrl} = each
                return (
                  <Link
                    to={`/users/${userId}`}
                    className="home-link"
                    onClick={() => changeCategory('users')}
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

  renderPostSuccess = () => {
    const {postsList} = this.state
    return (
      <ul className="post-list-items">
        {postsList.map(each => (
          <PostItem
            details={each}
            key={each.postId}
            likeThePost={this.likeThePost}
          />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {val => {
        const {isDarkMode} = val
        return (
          <div className="loader-container">
            <img
              src="https://res.cloudinary.com/shafi-tech/image/upload/v1679546355/Icon_m4tnrl.png"
              alt="failure view"
            />
            <p
              className={
                isDarkMode ? 'error-dark-heading' : 'error-light-heading'
              }
            >
              Something Went Wrong. Please try again
            </p>
            <button
              type="button"
              className="btn-try-again"
              onClick={() => this.getStories()}
            >
              Try again
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderPostFailure = () => (
    <ThemeContext.Consumer>
      {val => {
        const {isDarkMode} = val
        return (
          <div className="home-loading-container">
            <div className="loader-container">
              <img
                src="https://res.cloudinary.com/shafi-tech/image/upload/v1679546355/Icon_m4tnrl.png"
                alt="failure view"
              />
              <p
                className={
                  isDarkMode ? 'error-dark-heading' : 'error-light-heading'
                }
              >
                Something Went Wrong. Please try again
              </p>
              <button
                type="button"
                className="btn-try-again"
                onClick={() => this.getPosts()}
              >
                Try again
              </button>
            </div>
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

  renderPostLoading = () => (
    <div className="home-loading-container">
      <div className="loader-container">
        <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
      </div>
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

  renderPostsStatus = () => {
    const {postStatus} = this.state
    switch (postStatus) {
      case apiStatus.success:
        return this.renderPostSuccess()
      case apiStatus.failure:
        return this.renderPostFailure()
      case apiStatus.inProgress:
        return this.renderPostLoading()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMode, isFocused} = value
          const HomeBgColor = isDarkMode ? 'home-dark' : 'home-light'

          return (
            <>
              <Navbar />
              {isFocused ? (
                <SearchPage />
              ) : (
                <div className={`home-bg-container ${HomeBgColor}`}>
                  <div className="slick-container">
                    {this.renderStoriesStatus()}
                  </div>
                  <div className="post-container">
                    {this.renderPostsStatus()}
                  </div>
                </div>
              )}
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
