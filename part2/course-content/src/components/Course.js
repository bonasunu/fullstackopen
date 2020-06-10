import React from 'react'

const Header = ({title}) => {
    return (
    <h1>{title}</h1>
    )
  }
  
const Content = ({courses}) => {
const totalHalfStack = courses[0].parts
.map(part => part.exercises)
.reduce((sum, num) => sum + num);

const nodeJS = courses[1].parts
.map(part => part.exercises)
.reduce((sum, num) => sum + num);

return (
    <>
    <Header title={courses[0].name} />
    <Part name={courses[0].parts[0].name} exercises={courses[0].parts[0].exercises}/>
    <Part name={courses[0].parts[1].name} exercises={courses[0].parts[1].exercises}/>
    <Part name={courses[0].parts[2].name} exercises={courses[0].parts[2].exercises}/>
    <Part name={courses[0].parts[3].name} exercises={courses[0].parts[3].exercises}/>

    <p>total of {totalHalfStack} exercises</p>
    <br />
    <Header title={courses[1].name} />
    <Part name={courses[1].parts[0].name} exercises={courses[1].parts[0].exercises}/>
    <Part name={courses[1].parts[1].name} exercises={courses[1].parts[1].exercises}/>

    <p>total of {nodeJS} exercises</p>
    </>
)
}

const Part = ({name, exercises}) => {
return (
<p>{name} {exercises}</p>
)
}


const Course = ({courses}) => {
return (
    <>
    <h1>Web Development Curriculum</h1>
    <Content courses={courses} />
    </>
)
}

export default Course;