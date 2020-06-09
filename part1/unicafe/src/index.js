import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({text, value}) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);

  const onGoodClick = () => setGood(good + 1);
  const onNeutralClick = () => setNeutral(neutral + 1);
  const onBadClick = () => setBad(bad + 1);

  const all = () => good + neutral + bad;

  const averageStat = () => {
    let stat = (good * 1 + neutral * 0 + bad * -1) / (bad + neutral + good);

    if (stat > 0) {
      return stat;
    }
    else return 0;
  }
  
  const percentage = () => {
    let percent = good / (bad + neutral + good) * 100;

    if (percent > 0) {
      return `${percent} %`;
    }
    else {
      return 0;
    }
  } 

  if (bad > 0 || good > 0 || neutral > 0) {
    return (
      <div>
        <h1>give feedback</h1>
          <Button onClick={onGoodClick} text='good'/>
          <Button onClick={onNeutralClick} text='neutral'/>
          <Button onClick={onBadClick} text='bad'/>
        <h1>statistics</h1>
        <table>
          <Statistics text='good' value={good}/>
          <Statistics text='neutral' value={neutral}/>
          <Statistics text='bad' value={bad}/>
          <Statistics text='all' value={all()}/>
          <Statistics text='average' value={averageStat()}/>
          <Statistics text='positive' value={percentage()}/>
        </table>
      </div>
    );
  }
  else {
    return (
      <div>
        <h1>give feedback</h1>
          <Button onClick={onGoodClick} text='good'/>
          <Button onClick={onNeutralClick} text='neutral'/>
          <Button onClick={onBadClick} text='bad'/>
        <h1>statistics</h1>
          <p>No feedback given</p>
      </div>
    );
  }
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();