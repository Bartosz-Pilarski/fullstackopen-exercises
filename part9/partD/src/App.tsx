interface HeaderProps {
  courseName: string
}

interface CoursePart {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  courseParts: CoursePart[]
}

interface TotalProps {
  total: number
}

const Header = (props: HeaderProps): JSX.Element => {
  return <h1> {props.courseName} </h1>
}

const Content = (props: ContentProps): JSX.Element => {
  return <>
    {props.courseParts.map((part: CoursePart) => (<p> {part.name} {part.exerciseCount} </p>))}
  </>
}

const Total = (props: TotalProps): JSX.Element => {
  return <p> Number of exercise: {props.total} </p>
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;