import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
  if (good > 0) {
    return (
      <>
      <p>average {(good * 1 + neutral * 0 + bad * -1) / (bad + neutral + good)}</p>
      <p>positive {(good / (bad + neutral + good)) * 100} %</p>
      </>
    )
  }
  else {
    return (
      <>
      <p>average 0</p>
      <p>positive 0 %</p>
      </>
    )
  }
}

const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);

  const onGoodClick = () => setGood(good + 1);
  const onNeutralClick = () => setNeutral(neutral + 1);
  const onBadClick = () => setBad(bad + 1);

  if (good > 0) {
        
  }
  
  return (
    <div>
      <h1>give feedback</h1>
        <Button onClick={onGoodClick} text='good'/>
        <Button onClick={onNeutralClick} text='neutral'/>
        <Button onClick={onBadClick} text='bad'/>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {bad + neutral + good}</p>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
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
