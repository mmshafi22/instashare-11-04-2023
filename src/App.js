import {useState} from 'react'
import Cookies from 'js-cookie'
import {Switch, Route, Redirect} from 'react-router-dom'
import ThemeContext from './context/ThemeContext'
import Login from './components/Login'
import NotFound from './components/NotFound'
import UserDetails from './components/UserDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './components/Profile'
import Home from './components/Home'
import './App.css'

const searchStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

const App = () => {

  const theme = localStorage.getItem('theme') === null ? false : Boolean(localStorage.getItem('theme'))
  const activeTab = localStorage.getItem('category') === null ? 'Home' : localStorage.getItem('category')
  const [searchInput,setInput] = useState('')
  const [isDarkMode,setTheme] = useState(theme)
  const [category,setCategory] = useState(activeTab)
  const [searchList,addSearchList] = useState([])
  const [searchLoading,setLoading] = useState(searchStatus.initial)
  const [isFocused,setFocus] = useState(false)
  

  const getSearchResults = async () => {
    setLoading(searchStatus.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const {posts} = data
      const updatedList = posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postDetails: {
          imageUrl: each.post_details.image_url,
          caption: each.post_details.caption,
        },
        likesCount: each.likes_count,
        comments: each.comments,
        createdAt: each.created_at,
        likesStatus: false,
      }))
      addSearchList(updatedList)
      setLoading(searchStatus.success)  
    } else {
      setLoading(searchStatus.failure)
    }
  }

  const onClickLike = async id => {
    const jwtToken = Cookies.get('jwt_token')
    const obj = searchList.find(each => each.postId === id)
    const status = {like_status: !obj.likesStatus}
    const url = `https://apis.ccbp.in/insta-share/posts/${id}/like`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(status),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (data.message === 'Post has been liked') {
      const filteredList = searchList.map(item => item.postId === id ? {...item,likesStatus:true,likesCount: item.likesCount + 1} : 
                                       {...item})
        addSearchList(filteredList)
    } else {
      const filteredList = searchList.map(item => item.postId === id ? {...item,likesStatus:false,likesCount: item.likesCount - 1} : 
        {...item})
        addSearchList(filteredList)
    }
  }

  const changeFocus = () => {
    setFocus(true)
  }

  const changeTheme = () => {
    localStorage.setItem('theme',!isDarkMode)
    setTheme(!isDarkMode)
  }

  const changeCategory = text => {
    localStorage.setItem('category',text)
    setFocus(false)
    setCategory(text)
    setInput('')
  }

  const onChangeUsername = text => {
    setInput(text)
  }
    return (
      <ThemeContext.Provider
        value={{
          isDarkMode,
          category,
          searchInput,
          searchList,
          isFocused,
          searchLoading,
          changeTheme: changeTheme,
          changeCategory: changeCategory,
          changeFocus: changeFocus,
          getSearchResults: getSearchResults,
          onClickLike: onClickLike,
          onChangeUsername: onChangeUsername,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={Profile} />
          <ProtectedRoute exact path="/users/:id" component={UserDetails} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }

export default App
