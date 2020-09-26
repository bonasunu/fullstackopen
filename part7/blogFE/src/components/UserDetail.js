import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
  const id = useParams().id
  const user = useSelector((state) => state.users.filter((u) => u.id === id))
  console.log(user)
  console.log(user[0])

  if (!user[0]) return null

  return (
    <>
      <h2>{user[0].name}</h2>
      <h5>added blogs</h5>
      <ul>
        {user[0].blogs.map((blog) => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default UserDetail
