import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { voteInfo } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  let anecdotes = useSelector((state) => state.anecdotes)
  const setFilter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  if (setFilter !== '') {
    anecdotes = anecdotes.filter((item) =>
      item.content.toLowerCase().includes(setFilter.toLowerCase())
    )
  }

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
                dispatch(voteInfo(`You voted "${anecdote.content}"`, 5))
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
