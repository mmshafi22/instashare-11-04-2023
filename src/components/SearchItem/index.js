import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const SearchItem = props => {
  const {details} = props
  const {
    postId,
    userId,
    userName,
    profilePic,
    postDetails,
    likesCount,
    createdAt,
    likesStatus,
  } = details
  const {imageUrl, caption} = postDetails
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode, changeCategory, onClickLike} = value
        const textColor = isDarkMode ? 'search-text-dark' : 'search-text-light'
        return (
          <li className="search-item">
            <div className="search-name">
              <div className="search-user-img">
                <img src={profilePic} alt="post author profile" />
              </div>
              <Link
                to={`/users/${userId}`}
                className="link"
                onClick={() => changeCategory('users')}
              >
                <h1 className={textColor}>{userName}</h1>
              </Link>
            </div>
            <img src={imageUrl} alt="post" className="search-post-img" />
            <div className="search-like-share-comment">
              {likesStatus ? (
                <button
                  type="button"
                  className="search-btn-like"
                  onClick={() => onClickLike(postId)}
                  testid="unLikeIcon"
                >
                  <FcLike size={20} />
                </button>
              ) : (
                <button
                  type="button"
                  className="search-btn-like"
                  onClick={() => onClickLike(postId)}
                  testid="likeIcon"
                >
                  <BsHeart
                    size={20}
                    color={isDarkMode ? '#fefefe' : '#475569'}
                  />
                </button>
              )}
              <FaRegComment
                size={22}
                className="search-post-icon"
                color={isDarkMode ? '#fefefe' : '#475569'}
              />
              <BiShareAlt
                size={22}
                className="search-post-icon"
                color={isDarkMode ? '#fefefe' : '#475569'}
              />
            </div>
            <p className={`search-likes-text ${textColor}`}>
              {likesCount} likes
            </p>
            <p className={`search-caption ${textColor}`}>{caption}</p>
            <p className="search-time">{createdAt}</p>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default SearchItem
