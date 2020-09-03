const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'VOTE_INFO':
      state = action.data
      return state
    case 'REMOVE_INFO':
      return ''
    default:
      return state
  }
}

export const voteInfo = (content, time) => {
  return async (dispatch) => {
    await dispatch({ type: 'VOTE_INFO', data: content })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_INFO',
      })
    }, time * 1000)
  }
}

export default notificationReducer
