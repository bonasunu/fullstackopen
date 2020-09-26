import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
  const id = useParams().id
  const blog = useSelector((state) => state.blogs.filter((u) => u.id === id))[0]
  console.log(blog)

  if (!blog) return null

  return (
    <>
      <h2>{blog.title}</h2>
      <a href="#">{blog.url}</a>
      <p>{blog.likes} likes</p>
      <p>added by {blog.author}</p>
    </>
  )
}

export default UserDetail
