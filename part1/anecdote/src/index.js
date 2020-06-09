import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    new Array(props.anecdotes.length+1).join('0').split('').map(parseFloat)
  );

  let most = votes.indexOf(Math.max(...votes));

  const vote = () => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
    console.log(copy)
  };

  //const mostVotes = () => {
  //  votes.forEach(item => {
  //    if (item > most) {
  //      most = item;
  //    }
  //  });
  //}

  const next = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      <p>has {votes[selected]} votes</p>
      <br />
      <Button text='vote' onClick={vote} />
      <Button text='next anecdote' onClick={next} />
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[most]}
      <p>has {votes[most]} votes</p>
    </div>
  );
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
