import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/FilterReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  info: notificationReducer,
  filter: filterReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export const getId = () => (100000 * Math.random()).toFixed(0)

export default store
