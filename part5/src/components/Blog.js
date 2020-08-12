import React, { useState } from 'react'

// eslint-disable-next-line no-unused-vars
const Blog = ({ blog, handleLike, user, handleDeleteBlog }) => {
  const [detailVisible, setDetailVisible] = useState(false)
  const hideWhenVisible = { display: detailVisible ? 'none' : '' }
  const showWhenVisible = { display: detailVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    const newBlog = {
      user: blog.user.id,
      likes: blog.likes++,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    handleLike(newBlog, blog.id)
  }

  const removeBlog = () => {
    const result = window.confirm(`Remove blog ${blog.title}`)

    if (result === true) {
      handleDeleteBlog(blog.id)
    }
    console.log('Remove', result)
  }

  const RemoveButton = ({ blog }) => {
    if (user.username === blog.user.username) {
      return (
        <button onClick={removeBlog}>
          remove
        </button>
      )
    }
    else return null
  }

  return (
    <div style={blogStyle} className='blogStyle'>
      <div>
        <p>{blog.title} {blog.author}
          <button onClick={() => setDetailVisible(true)} style={hideWhenVisible} className='buttonTitle'>
            View
          </button>
          <button onClick={() => setDetailVisible(false)} style={showWhenVisible} className='buttonTitle'>
            Hide
          </button>
        </p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes}
          <button className='buttonTitle' onClick={addLike}>
            Like
          </button>
        </p>
        <p>{blog.author}</p>
        <div>
          <RemoveButton blog={blog}/>
        </div>
      </div>
    </div>
  )
}

export default Blog
