import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const info = useSelector((state) => state.info)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  if (info === '') {
    return null
  }

  return <div style={style}>{info}</div>
}

export default Notification
