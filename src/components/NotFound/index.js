import {withRouter, Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const NotFound = () => (
  <ThemeContext.Consumer>
    {val => {
      const {isDarkMode, changeCategory} = val
      const notBg = isDarkMode ? 'not-dark' : 'not-light'
      const notColor = isDarkMode ? 'not-text-dark' : 'not-text-light'
      return (
        <div className={`not-found-bg-container ${notBg}`}>
          <img
            src="https://res.cloudinary.com/shafi-tech/image/upload/v1678977954/Layer_2_v7mhcg.png"
            alt="page not found"
            className="not-found-img"
          />
          <h1 className={notColor}>Page Not Found</h1>
          <p className={notColor}>
            We are sorry, the page you requested could not be found.
          </p>
          <Link to="/" className="link-not">
            <button
              type="button"
              className="btn-home-page"
              onClick={() => changeCategory('Home')}
            >
              Home Page
            </button>
          </Link>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(NotFound)
