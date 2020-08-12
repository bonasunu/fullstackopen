import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const userLoggedJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (userLoggedJSON) {
      const user = JSON.parse(userLoggedJSON)
      setUser(user)
    }
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className='notification'>
        { message }
      </div>
    )
  }

  const ErrorMessage = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className='errorMessage'>
        { message }
      </div>
    )
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    await setUser(null)
    window.localStorage.clear()
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const newBlogFormRef = useRef()

  const handleCreateBlog = newBlog => {
    try {
      blogService
        .createBlog(newBlog)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    } catch (exception) {
      setErrorMessage('Blog creation failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    newBlogFormRef.current.toggleVisibility()

  }

  const handleLike = (newBlog, blogId) => {
    console.log('handleLike on!')
    try {
      blogService
        .updateBlog(newBlog, blogId)
    } catch (exception) {
      setErrorMessage('Blog creation failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDeleteBlog = blogId => {
    try {
      blogService
        .deleteBlog(blogId)
        .setBlogs(blogs.filter(blog => blog.id !== blogId))
    } catch (exception) {
      setErrorMessage('Blog deletion failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const newBlogForm = () => (
    <Toggleable buttonLabel='new blog' ref={newBlogFormRef}>
      <BlogForm
        handleCreateBlog={handleCreateBlog}
      />
    </Toggleable>
  )

  const viewBlog = () => {

    return (
      blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} user={user} handleDeleteBlog={handleDeleteBlog}>
          </Blog>)
    )
  }

  return (
    <div>
      <ErrorMessage message={errorMessage} />
      {user === null ?
        <>
          <h2>Log in to application</h2>
          {loginForm()}
        </> :
        <>
          <Notification message={message}/>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <br></br>
          <h2>create new</h2>
          {newBlogForm()}
          <br></br>
          {viewBlog()}
        </>
      }

    </div>
  )
}

export default App