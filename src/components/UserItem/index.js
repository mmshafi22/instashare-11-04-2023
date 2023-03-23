import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const UserItem = props => {
  const {details} = props
  const {
    userId,
    userName,
    profilePic,
    followersCount,
    followingCount,
    userBio,
    postsCount,
    posts,
    stories,
  } = details

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode} = value
        return (
          <div className="user-page-container">
            <div className="user-profile">
              <img
                src={profilePic}
                alt="user profile"
                className="user-profile-img"
              />
              <div className="name-details">
                <h1
                  className={isDarkMode ? 'user-name-dark' : 'user-name-light'}
                >
                  {userName}
                </h1>
                <div
                  className={`user-data ${
                    isDarkMode ? 'user-name-dark' : 'user-name-light'
                  }`}
                >
                  <p>
                    <span>{postsCount}</span> posts
                  </p>
                  <p>
                    <span>{followersCount}</span> followers
                  </p>
                  <p>
                    <span>{followingCount}</span> following
                  </p>
                </div>
                <p
                  className={`user-id ${
                    isDarkMode ? 'user-name-dark' : 'user-name-light'
                  }`}
                >
                  {userId}
                </p>
                <p
                  className={`bio ${
                    isDarkMode ? 'user-name-dark' : 'user-name-light'
                  }`}
                >
                  {userBio}
                </p>
              </div>
            </div>
            <div className="user-profile-mobile">
              <h1 className={isDarkMode ? 'user-name-dark' : 'user-name-light'}>
                {userName}
              </h1>
              <div className="profile-mobile-data">
                <img
                  src={profilePic}
                  alt="user profile"
                  className="user-profile-img"
                />
                <div className="user-data">
                  <div
                    className={`count ${
                      isDarkMode ? 'user-name-dark' : 'user-name-light'
                    }`}
                  >
                    <p className="count-num">{postsCount}</p>
                    <p className="count-text">posts</p>
                  </div>
                  <div
                    className={`count ${
                      isDarkMode ? 'user-name-dark' : 'user-name-light'
                    }`}
                  >
                    <p className="count-num">{followersCount}</p>
                    <p className="count-text">followers</p>
                  </div>
                  <div
                    className={`count ${
                      isDarkMode ? 'user-name-dark' : 'user-name-light'
                    }`}
                  >
                    <p className="count-num">{followingCount}</p>
                    <p className="count-text">following</p>
                  </div>
                </div>
              </div>
              <p
                className={`user-id ${
                  isDarkMode ? 'user-name-dark' : 'user-name-light'
                }`}
              >
                {userId}
              </p>
              <p
                className={`bio ${
                  isDarkMode ? 'user-name-dark' : 'user-name-light'
                }`}
              >
                {userBio}
              </p>
            </div>
            <ul className="stories-list-items">
              {stories.map(each => (
                <li className="story-item" key={each.id}>
                  <img src={each.image} alt="user story" />
                </li>
              ))}
            </ul>
            <hr />
            <div className="post-header">
              <BsGrid3X3 color={isDarkMode ? '#fafafa' : '#262626'} size={22} />
              <h1
                className={`user-id ${
                  isDarkMode ? 'user-name-dark' : 'user-name-light'
                }`}
              >
                Posts
              </h1>
            </div>
            {postsCount > 0 ? (
              <ul className="stories-list-items">
                {posts.map(item => (
                  <li className="post-image" key={item.id}>
                    <img src={item.image} alt="user post" />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-post-container">
                <div
                  className={`icon-container ${
                    isDarkMode ? 'icon-dark' : 'icon-light'
                  }`}
                >
                  <BiCamera
                    color={isDarkMode ? '#fafafa' : '#262626'}
                    size={30}
                  />
                </div>
                <h1
                  className={`no-posts-text ${
                    isDarkMode ? 'user-name-dark' : 'user-name-light'
                  }`}
                >
                  No Posts
                </h1>
              </div>
            )}
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default UserItem
