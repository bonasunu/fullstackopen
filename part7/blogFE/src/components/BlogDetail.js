import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlog, removeBlog } from '../reducers/blogsReducer'

const UserDetail = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const id = useParams().id
  // const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const blog = useSelector((state) => state.blogs.filter((u) => u.id === id))[0]
  console.log(blog)

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

  const handleComment = async (comment) => {
    const blogToComment = blogs.find((b) => b.id === id)
    console.log(blogToComment.comments)
    const blog = {
      ...blogToComment,
      comments: blogToComment.comments.concat(comment),
    }
    dispatch(updateBlog(blog))
  }

  if (!blog) return null

  return (
    <div className="container">
      <h2>{blog.title}</h2>
      <a href="#">{blog.url}</a>
      <div>
        likes {blog.likes}
        <button
          onClick={() => handleLike(blog.id)}
          className="btn btn-outline-info"
        >
          like
        </button>
      </div>
      <button
        onClick={() => handleRemove(blog.id)}
        className="btn btn-outline-info"
      >
        remove
      </button>
      <p>added by {blog.author}</p>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((c) => (
          <li>{c}</li>
        ))}
      </ul>
      <form onSubmit={handleComment}>
        <div>
          new comment
          <input
            id="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button id="comment-btn" className="btn btn-outline-info">
          add comment
        </button>
      </form>
    </div>
  )
}

export default UserDetail
