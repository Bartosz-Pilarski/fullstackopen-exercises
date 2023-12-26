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
  console.log(parts);
  return (
    <div>
      <Part 
        part={parts[0]}
      />
      <Part 
        part={parts[1]}
      />
      <Part 
        part={parts[2]}
      />
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

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  
  //as per 1.4's NB
  const exerciseNumbers = [parts[0].exercises, parts[1].exercises, parts[2].exercises];

  return (
    <div>
      <Header 
        coursename={course}
      />

      <Content 
        parts={parts}
      />

      <Total
        exercises={exerciseNumbers}
      />
    </div>
  )
}

export default App