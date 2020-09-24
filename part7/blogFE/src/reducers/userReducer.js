import loginService from '../services/login'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOAD_USER':
      return (state = action.data)
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}

export const loadUser = (credential) => {
  return async (dispatch) => {
    const user = await loginService.login(credential)
    dispatch({
      type: 'LOAD_USER',
      data: user,
    })
    return user
  }
}

export const signoutUser = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT_USER',
    })
  }
}

export default reducer
