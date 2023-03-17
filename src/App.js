import {Component} from 'react'
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

class App extends Component {
  state = {
    searchInput: '',
    isDarkMode: false,
    category: 'Home',
    searchList: [],
    isFocused: false,
    searchLoading: searchStatus.initial,
  }

  getSearchResults = async () => {
    this.setState({searchLoading: searchStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
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
      this.setState({
        searchList: updatedList,
        searchLoading: searchStatus.success,
      })
    } else {
      this.setState({searchLoading: searchStatus.failure})
    }
  }

  onClickLike = async id => {
    const {searchList} = this.state
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
      this.setState(prev => ({
        searchList: prev.searchList.map(item =>
          item.postId === id
            ? {...item, likesStatus: true, likesCount: item.likesCount + 1}
            : {...item},
        ),
      }))
    } else {
      this.setState(prev => ({
        searchList: prev.searchList.map(item =>
          item.postId === id
            ? {...item, likesStatus: false, likesCount: item.likesCount - 1}
            : {...item},
        ),
      }))
    }
  }

  changeFocus = () => {
    this.setState({isFocused: true, category: 'Search'})
  }

  changeTheme = () => {
    this.setState(prev => ({isDarkMode: !prev.isDarkMode}))
  }

  changeCategory = text => {
    this.setState({isFocused: false, category: text, searchInput: ''})
  }

  onChangeUsername = text => {
    this.setState({searchInput: text})
  }

  render() {
    const {
      isDarkMode,
      category,
      searchInput,
      searchList,
      isFocused,
      searchLoading,
    } = this.state
    return (
      <ThemeContext.Provider
        value={{
          isDarkMode,
          category,
          searchInput,
          searchList,
          isFocused,
          searchLoading,
          changeTheme: this.changeTheme,
          changeCategory: this.changeCategory,
          changeFocus: this.changeFocus,
          getSearchResults: this.getSearchResults,
          onClickLike: this.onClickLike,
          onChangeUsername: this.onChangeUsername,
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
}

export default App
