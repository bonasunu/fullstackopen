import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { voteInfo } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
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
            <button
              onClick={() => {
                dispatch(newVote(anecdote.id))
                dispatch(voteInfo(anecdote.content))
                setTimeout(() => dispatch(voteInfo('')), 5000)
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
