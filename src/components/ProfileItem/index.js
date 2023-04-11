import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const ProfileItem = props => {
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
          <div className="profile-page-container">
            <div className="my-profile">
              <img
                src={profilePic}
                alt="my profile"
                className="user-profile-img"
              />
              <div className="profile-name-details">
                <h1
                  className={
                    isDarkMode ? 'profile-name-dark' : 'profile-name-light'
                  }
                >
                  {userName}
                </h1>
                <div
                  className={`profile-data ${
                    isDarkMode ? 'profile-name-dark' : 'profile-name-light'
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
                  className={`profile-user-id ${
                    isDarkMode ? 'profile-name-dark' : 'profile-name-light'
                  }`}
                >
                  {userId}
                </p>
                <p
                  className={`profile-bio ${
                    isDarkMode ? 'profile-name-dark' : 'profile-name-light'
                  }`}
                >
                  {userBio}
                </p>
              </div>
            </div>
            <ul className="profile-stories-list-items">
              {stories.map(each => (
                <li className="profile-story-item" key={each.id}>
                  <img src={each.image} alt="my story" />
                </li>
              ))}
            </ul>
            <hr />
            <div className="profile-post-header">
              <BsGrid3X3 color={isDarkMode ? '#fafafa' : '#262626'} size={22} />
              <h1
                className={`profile-user-id ${
                  isDarkMode ? 'profile-name-dark' : 'profile-name-light'
                }`}
              >
                Posts
              </h1>
            </div>
            {postsCount > 0 ? (
              <ul className="profile-stories-list-items">
                {posts.map(item => (
                  <li className="profile-post-image" key={item.id}>
                    <img src={item.image} alt="my post" />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="profile-no-post-container">
                <div
                  className={`profile-icon-container ${
                    isDarkMode ? 'profile-icon-dark' : 'profile-icon-light'
                  }`}
                >
                  <BiCamera
                    color={isDarkMode ? '#fafafa' : '#262626'}
                    size={30}
                  />
                </div>
                <h1
                  className={`profile-no-posts-text ${
                    isDarkMode ? 'profile-name-dark' : 'profile-name-light'
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

export default ProfileItem
