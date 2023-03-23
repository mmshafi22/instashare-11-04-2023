import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {IoMdClose} from 'react-icons/io'
import {FiSun} from 'react-icons/fi'
import {FaMoon, FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

class Navbar extends Component {
  state = {menu: false}

  onOpenMenu = () => {
    this.setState({menu: true})
  }

  closeMenu = () => {
    this.setState({menu: false})
  }

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {menu} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {
            isDarkMode,
            changeTheme,
            changeCategory,
            category,
            searchInput,
            changeFocus,
            onChangeUsername,
            getSearchResults,
          } = value
          const navBgColor = isDarkMode ? 'nav-dark' : 'nav-light'
          const navColor = isDarkMode ? 'nav-color-dark' : 'nav-color-light'
          return (
            <>
              <div className={`mobile-container ${navBgColor}`}>
                <nav className={`mobile-view-nav ${navBgColor}`}>
                  <div className="nav-logo-container">
                    <Link
                      to="/"
                      className="link"
                      onClick={() => changeCategory('Home')}
                    >
                      <img
                        src="https://res.cloudinary.com/shafi-tech/image/upload/v1678364614/Group_fnwezk.png"
                        alt="website logo"
                        className="nav-logo"
                      />
                    </Link>
                    <h1 className={`nav-heading ${navColor}`}>Insta Share</h1>
                  </div>
                  <div className="navbar-icons">
                    <button
                      type="button"
                      className="btn-menu"
                      onClick={() => changeTheme()}
                    >
                      {isDarkMode ? (
                        <FiSun
                          size={25}
                          color={isDarkMode ? '#fefefe' : '#0f0f0f'}
                        />
                      ) : (
                        <FaMoon
                          size={25}
                          color={isDarkMode ? '#fefefe' : '#0f0f0f'}
                        />
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn-menu"
                      onClick={this.onOpenMenu}
                    >
                      <GiHamburgerMenu size={30} className={navColor} />
                    </button>
                  </div>
                </nav>
                {menu && (
                  <div className="mobile-menu-items">
                    <ul className="nav-items-list">
                      <li
                        className={`${navColor} ${
                          category === 'Search' ? 'active' : ''
                        }`}
                        onClick={() => changeFocus()}
                        key="SEARCH"
                      >
                        Search
                      </li>
                      <li
                        className={category === 'Home' ? 'active' : ''}
                        onClick={() => changeCategory('Home')}
                        key="HOME"
                      >
                        <Link className={`link ${navColor}`} to="/">
                          Home
                        </Link>
                      </li>
                      <li
                        className={category === 'Profile' ? 'active' : ''}
                        onClick={() => changeCategory('Profile')}
                        key="PROFILE"
                      >
                        <Link className={`link ${navColor}`} to="/my-profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="btn-logout"
                          onClick={this.onLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                    <button
                      type="button"
                      className="btn-menu"
                      onClick={this.closeMenu}
                    >
                      <IoMdClose
                        size={20}
                        color={isDarkMode ? '#fefefe' : '#0f0f0f'}
                      />
                    </button>
                  </div>
                )}
              </div>
              <nav className={`large-mobile-view-nav ${navBgColor}`}>
                <div className="nav-logo-container">
                  <Link
                    to="/"
                    className="link"
                    onClick={() => changeCategory('Home')}
                  >
                    <img
                      src="https://res.cloudinary.com/shafi-tech/image/upload/v1678364614/Group_fnwezk.png"
                      alt="website logo"
                      className="nav-logo"
                    />
                  </Link>
                  <h1 className={`nav-heading ${navColor}`}>Insta Share</h1>
                </div>
                <ul className="nav-items-list">
                  <li className="nav-search" key="Search">
                    <input
                      type="search"
                      className={
                        isDarkMode ? 'nav-input-dark' : 'nav-input-light'
                      }
                      onFocus={() => changeFocus()}
                      onChange={event => onChangeUsername(event.target.value)}
                      value={searchInput}
                      placeholder="Search Caption"
                    />
                    <button
                      type="button"
                      className={`nav-search-icon ${
                        isDarkMode ? 'nav-icon-dark' : 'nav-icon-light'
                      }`}
                      onClick={() => getSearchResults()}
                      testid="searchIcon"
                    >
                      <FaSearch color="#262626" size={18} />
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="btn-menu"
                      onClick={() => changeTheme()}
                    >
                      {isDarkMode ? (
                        <FiSun
                          size={25}
                          color={isDarkMode ? '#fefefe' : '#0f0f0f'}
                        />
                      ) : (
                        <FaMoon
                          size={25}
                          color={isDarkMode ? '#fefefe' : '#0f0f0f'}
                        />
                      )}
                    </button>
                  </li>
                  <li
                    className={category === 'Home' ? 'active' : ''}
                    onClick={() => changeCategory('Home')}
                    key="HOME"
                  >
                    <Link className={`link ${navColor}`} to="/">
                      Home
                    </Link>
                  </li>
                  <li
                    className={category === 'Profile' ? 'active' : ''}
                    onClick={() => changeCategory('Profile')}
                    key="PROFILE"
                  >
                    <Link className={`link ${navColor}`} to="/my-profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="btn-logout"
                      onClick={this.onLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(Navbar)
