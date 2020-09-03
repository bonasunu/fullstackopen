import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW':
      console.log('New anecdotes')
      return state.concat(action.data)
    case 'VOTE':
      const toChange = state.find((n) => n.id === action.data)
      const newVote = {
        ...toChange,
        votes: toChange.votes + 1,
      }
      return state.map((item) => (item.id !== action.data ? item : newVote))
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const HandleNewAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newObj = await anecdotesService.createNew(anecdote)
    dispatch({ type: 'NEW', data: newObj })
  }
}

export const newVote = (id) => {
  return async (dispatch) => {
    await anecdotesService.updateItem(id)
    dispatch({
      type: 'VOTE',
      data: id,
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({ type: 'INIT_ANECDOTES', data: anecdotes })
  }
}

export default reducer
