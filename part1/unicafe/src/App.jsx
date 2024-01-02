import { useState } from 'react'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatDisplay = ({text, stat}) => {
  return (
    <p> {text} {stat} </p>
  )
} 

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
    console.log("good :)")
    console.log("State (good) before updating: ", good)
    setGood(good+1)
  }
  const handleNeutralFeedback = () => {
    console.log("neutral :|")
    console.log("State (neutral) before updating: ", neutral)
    setNeutral(neutral+1)
  }
  const handleBadFeedback = () => {
    console.log("bad :(")
    console.log("State (bad) before updating: ", bad)
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
        <Button text="good" onClick={handleGoodFeedback}/>
        <Button text="neutral" onClick={handleNeutralFeedback}/>
        <Button text="bad" onClick={handleBadFeedback}/>
      <h1>statistics</h1>
        <StatDisplay text="good" stat={good}/>
        <StatDisplay text="neutral" stat={neutral}/>
        <StatDisplay text="bad" stat={bad}/>
    </div>
  )
}

export default App