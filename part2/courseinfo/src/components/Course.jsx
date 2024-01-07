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
    return (
        <div>
        {parts.map((part) => (<Part key={part.id} part={part}/>))}
        </div>
    )
}

const Total = ({parts}) => {
    return (
        <p>
        Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}
        </p>
    )
}

const Course = ({courses}) => {
    return(
        <div>
        {courses.map((course) => {return (
            <div key={course.id}>
            <Header coursename={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
            </div>
        )})}
        </div>
    )
}

export default Course