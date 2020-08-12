import React, { useState } from 'react'

const BlogForm = ({
  handleCreateBlog
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = event => {
    event.preventDefault()

    const newBlogObj = {
      title: title,
      author: author,
      url: url
    }

    handleCreateBlog(newBlogObj)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addNewBlog} className='formDiv'>
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
}

export default BlogForm
