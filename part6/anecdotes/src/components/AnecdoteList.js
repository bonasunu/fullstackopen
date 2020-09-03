import React from 'react'
import { connect } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { voteInfo } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const sorting = (a, b) => b.votes - a.votes

  return (
    <>
      <h2>Anecdotes</h2>
      {props.anecdotes.sort(sorting).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                props.newVote(anecdote.id)
                props.voteInfo(`You voted "${anecdote.content}"`, 5)
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

const mapStateToProps = (state) => {
  if (state.filter !== '') {
    let anecdotes = state.anecdotes.filter((item) =>
      item.content.toLowerCase().includes(state.filter.toLowerCase())
    )

    return {
      anecdotes: anecdotes,
    }
  }

  return { anecdotes: state.anecdotes }
}

const mapDispatchToProps = {
  newVote,
  voteInfo,
}

const connectedAnecdote = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default connectedAnecdote
