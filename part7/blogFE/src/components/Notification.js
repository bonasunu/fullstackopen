import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const info = useSelector((state) => state.info)
  if (info.data === '') {
    return null
  }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: info.color === 'success' ? 'green' : 'red',
    background: 'lightgrey',
  }

  return <div style={style}>{info.data}</div>
}

export default Notification
