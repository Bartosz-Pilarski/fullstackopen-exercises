import { assertNever } from "./util";

interface HeaderProps {
  courseName: string
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;

interface CoursePartBase {
  name: string,
  exerciseCount: number
}
interface CoursePartDescriptive extends CoursePartBase {
  description: string;
}


interface CoursePartBasic extends CoursePartDescriptive {
  kind: "basic"
}
interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}
interface CoursePartBackground extends CoursePartDescriptive {
  backgroundMaterial: string;
  kind: "background"
}
interface CoursePartRequirements extends CoursePartDescriptive {
  requirements: string[],
  kind: "special"
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

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return(
        <div>
          <b> {props.name} - {props.exerciseCount} exercises </b>
          <p> {props.description} </p>
        </div>
      )
    case "group":
      return(
        <div>
          <b> {props.name} - {props.exerciseCount} exercises </b>
          <p> Project exercises: {props.groupProjectCount} </p>
        </div>
      )
    case "background":
      return(
        <div>
          <b> {props.name} - {props.exerciseCount} exercises </b>
          <p> {props.description} </p>
          <p> Additional material: {props.backgroundMaterial} </p>
        </div>
      )
    case "special":
      return(
        <div>
        <b> {props.name} - {props.exerciseCount} exercises </b>
        <p> {props.description} </p>
        <p> Requirements: {props.requirements.join(', ')} </p>
      </div>
      )
    default:
      return assertNever(props)
  }
}

const Content = (props: ContentProps): JSX.Element => {
  return <>
    {props.courseParts.map((part: CoursePart, index) => (<Part key={index} {...part} />))}
  </>
}

const Total = (props: TotalProps): JSX.Element => {
  return <p> Number of exercise: {props.total} </p>
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
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