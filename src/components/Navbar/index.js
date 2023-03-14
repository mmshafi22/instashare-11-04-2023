import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {IoMdClose} from 'react-icons/io'
import {FiSun} from 'react-icons/fi'
import {FaMoon} from 'react-icons/fa'
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
          const {isDarkMode, changeTheme, changeCategory, category} = value
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
                      <Link className={`link ${navColor}`} to="/search">
                        <li
                          className={category === 'Search' ? 'active' : ''}
                          onClick={() => changeCategory('Search')}
                          key="SEARCH"
                        >
                          Search
                        </li>
                      </Link>
                      <Link className={`link ${navColor}`} to="/">
                        <li
                          className={category === 'Home' ? 'active' : ''}
                          onClick={() => changeCategory('Home')}
                          key="HOME"
                        >
                          Home
                        </li>
                      </Link>
                      <Link className={`link ${navColor}`} to="/my-profile">
                        <li
                          className={category === 'Profile' ? 'active' : ''}
                          onClick={() => changeCategory('Profile')}
                          key="PROFILE"
                        >
                          Profile
                        </li>
                      </Link>
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
                  <Link to="/" className="link">
                    <img
                      src="https://res.cloudinary.com/shafi-tech/image/upload/v1678364614/Group_fnwezk.png"
                      alt="website logo"
                      className="nav-logo"
                    />
                  </Link>
                  <h1 className={`nav-heading ${navColor}`}>Insta Share</h1>
                </div>
                <ul className="nav-items-list">
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
                  <Link className={`link ${navColor}`} to="/search">
                    <li
                      className={category === 'Search' ? 'active' : ''}
                      onClick={() => changeCategory('Search')}
                      key="SEARCH"
                    >
                      Search
                    </li>
                  </Link>
                  <Link className={`link ${navColor}`} to="/">
                    <li
                      className={category === 'Home' ? 'active' : ''}
                      onClick={() => changeCategory('Home')}
                      key="HOME"
                    >
                      Home
                    </li>
                  </Link>
                  <Link className={`link ${navColor}`} to="/my-profile">
                    <li
                      className={category === 'Profile' ? 'active' : ''}
                      onClick={() => changeCategory('Profile')}
                      key="PROFILE"
                    >
                      Profile
                    </li>
                  </Link>
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
