import anecdotesAtStart, { asObject } from './store'

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW':
      console.log('New anecdotes')
      const newObj = asObject(action.data)
      return state.concat(newObj)
    case 'VOTE':
      const toChange = state.find((n) => n.id === action.data)
      const newVote = {
        ...toChange,
        votes: toChange.votes + 1,
      }
      return state.map((item) => (item.id !== action.data ? item : newVote))
    default:
      return state
  }
}

export const HandleNewAnecdote = (anecdote) => {
  return {
    type: 'NEW',
    data: anecdote,
  }
}

export const newVote = (id) => {
  return {
    type: 'VOTE',
    data: id,
  }
}

export default reducer
