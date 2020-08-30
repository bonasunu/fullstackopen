const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'VOTE_INFO':
      state = action.data
      return state
    default:
      return ''
  }
}

export const voteInfo = (content) => {
  return {
    type: 'VOTE_INFO',
    data: content,
  }
}

export default notificationReducer
