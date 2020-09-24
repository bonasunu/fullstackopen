const reducer = (state = { data: '' }, action) => {
  switch (action.type) {
    case 'ADD_INFO':
      state = { data: action.info, color: action.color }
      return state
    case 'REMOVE_INFO':
      return { data: '' }
    default:
      return state
  }
}

let timeout

export const notify = (content, color = 'success') => {
  return async (dispatch) => {
    await dispatch({ type: 'ADD_INFO', info: content, color: color })

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      dispatch({ type: 'REMOVE_INFO' })
    }, 5000)
  }
}

export default reducer
