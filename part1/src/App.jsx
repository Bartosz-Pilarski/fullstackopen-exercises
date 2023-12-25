const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p> Yeah okay buddy. boy. buddy {props.name}. buddy. boy. </p>
    </div>
  )
}

const App = () => {
  const now = new Date();
  console.log(now);

  return (
    <div>
      <Hello 
        name="boy"
      />
      <Hello 
        name={"babl"+"oinga"}
      />
    </div>
  )
}

export default App