const Header = ({coursename}) => {
  return (
    <h1> {coursename} </h1>
  )
}

const Part = ({part, numberOfExercises}) => {
  console.log(part, numberOfExercises)
  return (
    <p>
      {part} {numberOfExercises}
    </p>
  )
}

const Content = ({part1, exercises1, part2, exercises2, part3, exercises3}) => {
  return (
    <div>
      <Part 
        part={part1}
        numberOfExercises={exercises1}
      />
      <Part 
        part={part2}
        numberOfExercises={exercises2}
      />
      <Part 
        part={part3}
        numberOfExercises={exercises3}
      />
    </div>
  )
}

const Total = ({exercises}) => {
  var sum = 0;
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const exerciseNumbers = [exercises1,exercises2,exercises3];

  return (
    <div>
      <Header coursename={course}/>

      <Content 
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />

      <Total
        exercises={exerciseNumbers}
      />
    </div>
  )
}

export default App