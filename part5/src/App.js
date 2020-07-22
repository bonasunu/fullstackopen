/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // set new blog
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() =>{
    const userLoggedJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (userLoggedJSON) {
      const user = JSON.parse(userLoggedJSON)
      setUser(user)
      //loginService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message }) => {
    if (message == null) {
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
    await setUser(null);
    window.localStorage.clear();
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username
          <input 
          type='text' 
          value={username}
          name='Username'
          onChange = { ({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          password
          <input
          type='password'
          value={password}
          name='Password'
          onChange= { ({ target }) => setPassword(target.value)}
          >
          </input>
        </div>
        <button type='submit'>Login</button>
      </form>
  )
  
  const handleCreateBlog = (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
  
      console.log(user.token)
      blogService
        .createBlog(newBlog)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setTitle('')
          setAuthor('')
          setUrl('')
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
    
  }

  const newBlogForm = () => (
    <form onSubmit={handleCreateBlog}>
      <div>
        title:
        <input
        type='text'
        value={title}
        name='Title'
        onChange= { ({ target }) => setTitle(target.value)}
        >
        </input>
      </div>
      <div>
        author:
        <input
        type='text'
        value={author}
        name='Author'
        onChange = { ({ target }) => setAuthor(target.value)}
        >
        </input>
      </div>
      <div>
        url:
        <input
        type='text'
        value={url}
        name='URL'
        onChange = { ({ target }) => setUrl(target.value)}
        >
        </input>
      </div>
      <button type='submit'>Create</button>
    </form>
  )

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
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      }
      
    </div>
  )
}

export default App