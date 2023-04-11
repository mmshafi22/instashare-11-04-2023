import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import ThemeContext from '../../context/ThemeContext'
import SearchItem from '../SearchItem'
import './index.css'

const search = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class SearchPage extends Component {
  renderSearchInitial = () => (
    <div className="initial-loading">
      <img
        src="https://res.cloudinary.com/shafi-tech/image/upload/v1678889622/Frame_1473_tqvfgs.png"
        alt="search img"
      />
      <h1 className="initial-heading">Search Results will be appear here.</h1>
    </div>
  )

  renderSearchNotFound = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode, getSearchResults} = value
        return (
          <div className="initial-loading">
            <img
              src="https://res.cloudinary.com/shafi-tech/image/upload/v1678959251/Group_2_gqkryu.png"
              alt="search not found"
              className="search-failure-img"
            />
            <h1
              className={isDarkMode ? 'search-fail-dark' : 'search-fail-light'}
            >
              Search Not Found
            </h1>
            <p className="fail-caption">
              Try different keyword or search again
            </p>
            <button
              className="search-btn-try-again"
              type="button"
              onClick={() => getSearchResults()}
            >
              Try again
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderSearchLoading = () => (
    <div className="initial-loading">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSearchFailure = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode, getSearchResults} = value
        return (
          <div className="initial-loading">
            <img
              src="https://res.cloudinary.com/shafi-tech/image/upload/v1678789524/Group_7522_qi3cbr.png"
              alt="failure view"
              className="search-failure-img"
            />
            <p
              className={isDarkMode ? 'search-fail-dark' : 'search-fail-light'}
            >
              Something went wrong. Please try again
            </p>
            <button
              className="search-btn-try-again"
              type="button"
              onClick={() => getSearchResults()}
            >
              Try again
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderSearchSuccess = () => (
    <ThemeContext.Consumer>
      {value => {
        const {searchList, isDarkMode} = value
        const colorSearch = isDarkMode ? 'search-dark' : 'search-light'
        if (searchList.length === 0) {
          return this.renderSearchNotFound()
        }
        return (
          <div className="search-results-container">
            <h1 className={`search-heading ${colorSearch}`}>Search Results</h1>
            <ul className="search-list-items">
              {searchList.map(each => (
                <SearchItem details={each} key={each.postId} />
              ))}
            </ul>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderSearchResults = () => (
    <ThemeContext.Consumer>
      {value => {
        const {searchLoading} = value
        switch (searchLoading) {
          case search.success:
            return this.renderSearchSuccess()
          case search.failure:
            return this.renderSearchNotFound()
          case search.inProgress:
            return this.renderSearchLoading()
          case search.initial:
            return this.renderSearchInitial()
          default:
            return null
        }
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {
            isDarkMode,
            changeFocus,
            searchInput,
            onChangeUsername,
            getSearchResults,
          } = value
          const bgColor = isDarkMode ? 'search-dark' : 'search-light'
          return (
            <div className={`search-page-container ${bgColor}`}>
              <div className="search-container">
                <div className="input-search">
                  <input
                    type="search"
                    className={isDarkMode ? 'input-dark' : 'input-light'}
                    onFocus={() => changeFocus()}
                    onChange={event => onChangeUsername(event.target.value)}
                    value={searchInput}
                    placeholder="Search Caption"
                  />
                  <button
                    type="button"
                    className={`search-icon ${
                      isDarkMode ? 'icon-dark' : 'icon-light'
                    }`}
                    onClick={() => getSearchResults()}
                  >
                    <FaSearch color="#262626" size={18} />
                  </button>
                </div>
                {this.renderSearchResults()}
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default SearchPage
