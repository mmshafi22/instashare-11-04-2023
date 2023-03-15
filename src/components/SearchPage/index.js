import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import ThemeContext from '../../context/ThemeContext'
import Navbar from '../Navbar'
import './index.css'

const searchStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class SearchPage extends Component {
  state = {
    searchInput: '',
    searchLoading: searchStatus.initial,
    searchResults: [],
  }

  getSearchResults = async () => {
    this.setState({searchLoading: searchStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
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
      const updatedList = posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postDetails: {
          imageUrl: each.post_details.image_url,
          caption: each.post_details.caption,
        },
        likesCount: each.likes_count,
        createdAt: each.created_at,
      }))
      this.setState({
        searchResults: updatedList,
        searchLoading: searchStatus.inProgress,
      })
    } else {
      this.setState({searchLoading: searchStatus.failure})
    }
  }

  renderSearchInitial = () => (
    <div className="initial-loading">
      <img
        src="https://res.cloudinary.com/shafi-tech/image/upload/v1678889622/Frame_1473_tqvfgs.png"
        alt="search img"
      />
      <h1 className="initial-heading">Search Results will be appear here.</h1>
    </div>
  )

  renderSearchResults = () => {
    const {searchLoading} = this.state
    switch (searchLoading) {
      case searchStatus.success:
        return this.renderSearchSuccess()
      case searchStatus.failure:
        return this.renderSearchFailure()
      case searchStatus.inProgress:
        return this.renderSearchLoading()
      case searchStatus.initial:
        return this.renderSearchInitial()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMode} = value
          const bgColor = isDarkMode ? 'search-dark' : 'search-light'
          return (
            <>
              <Navbar />
              <div className={`search-page-container ${bgColor}`}>
                <div className="search-container">
                  <div className="input-search">
                    <input
                      type="search"
                      className={isDarkMode ? 'input-dark' : 'input-light'}
                    />
                    <button
                      type="button"
                      className={`search-icon ${
                        isDarkMode ? 'icon-dark' : 'icon-light'
                      }`}
                    >
                      <BsSearch color="#262626" size={18} />
                    </button>
                  </div>
                  {this.renderSearchResults()}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default SearchPage
