import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const PostItem = props => {
  const {details, likeThePost} = props
  const {
    postId,
    userId,
    userName,
    profilePic,
    postDetails,
    likesCount,
    createdAt,
    likeStatus,
  } = details
  const {imageUrl, caption} = postDetails
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMode, changeCategory} = value
        const textColor = isDarkMode ? 'text-dark' : 'text-light'
        return (
          <li className="post-item">
            <div className="user-name">
              <div className="user-img">
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
            <img src={imageUrl} alt="post" className="post-img" />
            <div className="like-share-comment">
              {likeStatus ? (
                <button
                  type="button"
                  className="btn-like"
                  onClick={() => likeThePost(postId)}
                >
                  <FcLike size={20} />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-like"
                  onClick={() => likeThePost(postId)}
                >
                  <BsHeart
                    size={20}
                    color={isDarkMode ? '#fefefe' : '#475569'}
                  />
                </button>
              )}
              <FaRegComment
                size={22}
                className="post-icon"
                color={isDarkMode ? '#fefefe' : '#475569'}
              />
              <BiShareAlt
                size={22}
                className="post-icon"
                color={isDarkMode ? '#fefefe' : '#475569'}
              />
            </div>
            <p className={`likes-text ${textColor}`}>{likesCount} likes</p>
            <p className={`caption ${textColor}`}>{caption}</p>
            <p className="time">{createdAt}</p>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default PostItem
