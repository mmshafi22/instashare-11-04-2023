import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const PostItem = props => {
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
        const {isDarkMode} = value
        const textColor = isDarkMode ? 'text-dark' : 'text-light'
        return (
          <li className="post-item">
            <div className="user-name">
              <div className="user-img">
                <img src={profilePic} alt="post author profile" />
              </div>
              <h1 className={textColor}>{userName}</h1>
            </div>
            <img src={imageUrl} alt="post" className="post-img" />
            <div className="like-share-comment">
              {likesStatus ? (
                <button type="button" className="btn-like">
                  <FcLike size={20} />
                </button>
              ) : (
                <button type="button" className="btn-like">
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
