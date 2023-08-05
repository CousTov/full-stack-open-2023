import React from 'react'

const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}
  
const Content = ({parts}) => {
  const part = parts.map(e =>
      <Part key={e.id} part={e} /> 
    );
  return (
    <span> {part} </span>
  )
}
  
const Part = ({part}) => {

  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((s, p) => {
    return s + p.exercises
  }, 0)

  return(
    <b>Total number of excercises : {total} </b>
  )
}

const Course = ({ course }) => {
  return(
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
