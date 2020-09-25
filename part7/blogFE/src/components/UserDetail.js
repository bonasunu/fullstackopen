import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
  const id = useParams().id
  const user = useSelector((state) => state.users.filter((u) => u.id === id))
  console.log(user)
  console.log(user[0])

  if (!user) return null

  return (
    <>
      <h2>{id}</h2>
    </>
  )
}

export default UserDetail
