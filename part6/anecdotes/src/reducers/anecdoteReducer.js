import { asObject } from './store'

// const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW':
      console.log('New anecdotes')
      //const newObj = asObject(action.data)
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

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default reducer
