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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  const exerciseNumbers = [part1.exercises,part2.exercises,part3.exercises];

  return (
    <div>
      <Header coursename={course}/>

      <Content 
        part1={part1.name}
        exercises1={part1.exercises}
        part2={part2.name}
        exercises2={part2.exercises}
        part3={part3.name}
        exercises3={part3.exercises}
      />

      <Total
        exercises={exerciseNumbers}
      />
    </div>
  )
}

export default App