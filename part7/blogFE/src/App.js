import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Userslist from './components/UsersList'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'
import blogService from './services/blogs'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogsReducer'
import { loadUser, signoutUser } from './reducers/userReducer'
import { loadUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(loadUsers())
    dispatch(initBlogs())
    dispatch(loadUsers())
    const user = storage.loadUser()
    dispatch({
      type: 'LOAD_USER',
      data: user,
    })
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await dispatch(loadUser({ username, password }))
      console.log(user)
      setUsername('')
      setPassword('')
      dispatch(notify(`${user.name} welcome back!`))
      storage.saveUser(user)
    } catch (exception) {
      console.log(exception)
      dispatch(notify('wrong username/password', 'error'))
    }
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      dispatch(initBlogs())
      dispatch(
        notify(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
      )
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    dispatch(signoutUser())
    storage.logoutUser()
  }

  const padding = {
    padding: 5,
  }

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login">login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
        </div>
        <h2>blogs</h2>
        <Notification />

        <Switch>
          <Route path="/users/:id">
            <UserDetail />
          </Route>
          <Route path="/blogs/:id">
            <BlogDetail />
          </Route>
          <Route path="/users">
            <Userslist />
          </Route>
          <Route path="/">
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <NewBlog createBlog={createBlog} />
            </Togglable>
            {blogs.sort(byLikes).map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
