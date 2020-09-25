import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
  const id = useParams().id
  const blog = useSelector((state) => state.blogs.filter((u) => u.id === id))
  console.log(blog)

  if (!blog) return null

  return (
    <>
      <h2>{id}</h2>
    </>
  )
}

export default UserDetail
