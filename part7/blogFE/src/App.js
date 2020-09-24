import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
// import loginService from './services/login'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { initBlogs, updateBlog, removeBlog } from './reducers/blogsReducer'
import { loadUser, signoutUser } from './reducers/userReducer'

const App = () => {
  //const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
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

  const handleLike = async (id) => {
    const blogToLike = blogs.find((b) => b.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    }
    dispatch(updateBlog(likedBlog))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find((b) => b.id === id)
    const ok = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
    )
    if (ok) {
      dispatch(removeBlog(id))
    }
  }

  const handleLogout = () => {
    dispatch(signoutUser())
    storage.logoutUser()
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
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {blogs.sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username === blog.user.username}
        />
      ))}
    </div>
  )
}

export default App
