import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const info = useSelector((state) => state.info)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return <div style={style}>You voted '{info}'</div>
}

export default Notification
