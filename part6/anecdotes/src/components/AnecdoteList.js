import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const sorting = (a, b) => b.votes - a.votes

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.sort(sorting).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(newVote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
