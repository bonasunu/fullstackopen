import React from 'react'
import { useSelector } from 'react-redux'

const UsersList = () => {
  const users = useSelector((state) => state.users)
  const padding = {
    padding: 5,
    margin: 5,
  }

  return (
    <>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th style={padding}>blogs created</th>
        </tr>

        {users.map((user) => (
          <tr>
            <td>{user.name}</td>
            <td style={padding}>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </>
  )
}

export default UsersList
