const Header = ({coursename}) => {
  return (
    <h1> {coursename} </h1>
  )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  console.log(parts)
  return (
    <div>
      {parts.map((part) => (<Part key={part.id} part={part}/>))}
    </div>
  )
}

const Total = ({exercises}) => {
  let sum = 0;
  for (let index = 0; index < exercises.length; index++) {
    sum += exercises[index];
  }
  return (
    <p>
      Number of exercises {sum}
    </p>
  )
}

const Course = ({course}) => {
  console.log(course.name)
  return(
    <div>
      <Header coursename={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App