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

const Statistics = ({good, neutral, bad}) => {
  const voteSum = good+neutral+bad;

  const calculateAverageFeedback = () => {
    const sum = (good*1)+(bad*-1)
    console.log("Sum: ", sum, "Vote sum: ", voteSum);
    return sum/voteSum
  }

  const calculatePositivePercentage = () => {return (good/voteSum)*100+"%"}

  return (
    <div>
        <h1>statistics</h1>
          <StatDisplay text="good" stat={good}/>
          <StatDisplay text="neutral" stat={neutral}/>
          <StatDisplay text="bad" stat={bad}/>
          <StatDisplay text="all" stat={voteSum}/>
          <StatDisplay text="average" stat={calculateAverageFeedback()}/>
          <StatDisplay text="positive" stat={calculatePositivePercentage()}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
    setGood(good+1)
  }
  const handleNeutralFeedback = () => {
    setNeutral(neutral+1)
  }
  const handleBadFeedback = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
        <Button text="good" onClick={handleGoodFeedback}/>
        <Button text="neutral" onClick={handleNeutralFeedback}/>
        <Button text="bad" onClick={handleBadFeedback}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App