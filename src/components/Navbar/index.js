import {Component} from 'react'
import {Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

class Navbar extends Component {
  state = {tag: 'Home', menu: false}

  onOpenMenu = () => {
    this.setState({menu: true})
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMode} = value
          const navBgColor = isDarkMode ? 'nav-dark' : 'nav-light'
          const navColor = isDarkMode ? 'nav-color-dark' : 'nav-color-light'

          return (
            <>
              <div className={`mobile-container ${navBgColor}`}>
                <nav className={`mobile-view-nav ${navBgColor}`}>
                  <div className="nav-logo-container">
                    <img
                      src="https://res.cloudinary.com/shafi-tech/image/upload/v1678364614/Group_fnwezk.png"
                      alt="website logo"
                      className="nav-logo"
                    />
                    <h1 className={`nav-heading ${navColor}`}>Insta Share</h1>
                  </div>
                  <button
                    type="button"
                    className="btn-menu"
                    onClick={this.onOpenMenu}
                  >
                    <GiHamburgerMenu size={40} className={navColor} />
                  </button>
                </nav>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Navbar
