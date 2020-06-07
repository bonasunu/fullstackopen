import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  const course = "Half Stack application development";
  //const part1 = 'Fundamentals of React';
  //const exercises1 = 10;
  //const part2 = 'Using props to pass data';
  //const exercises2 = 7;
  //const part3 = 'State of a component';
  //const exercises3 = 14;
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: "Using props to pass data",
      exercises: 7
    },
    {
      name: "State of a component",
      exercises: 14
    }
  ]

  //const part1 = {
  //  name: 'Fundamentals of React',
  //  exercises: 10
  //}
//
  //const part2 = {
  //  name: "Using props to pass data",
  //  exercises: 7
  //}
//
  //const part3 = {
  //  name: "State of a component",
  //  exercises: 14
  //}

  return (
    <div>
      <Header course={course}/>
      <Content part={[parts[0].name, parts[1].name, parts[2].name]} exercise={[parts[0].exercises, parts[1].exercises, parts[2].exercises]}/>
      <Total total={[parts[0].exercises, parts[1].exercises, parts[2].exercises]}/>
    </div>
  );
}

const Header = (props) => {
  return (
    <>
    <h1>{props.course}</h1>
    </>
  );
}

const Content = (props) => {
  return (
    <>
    <Part part={props.part[0]} exercise={props.exercise[0]}/>
    <Part part={props.part[1]} exercise={props.exercise[1]}/>
    <Part part={props.part[2]} exercise={props.exercise[2]}/>
    </>
  );
}

const Total = (props) => {
  return (
    <>
    <p>Number of exercises {props.total}</p>
    </>
  );
}

const Part = (props) => {
  return (
    <>
    <p>{props.part} {props.exercise}</p>
    </>
  );
}

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
