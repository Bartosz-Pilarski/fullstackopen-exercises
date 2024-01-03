import { useState } from 'react'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const TopAnecdote = ({anecdotes, votes}) => {
  const mostVoted = () => {
    let mostVotedIndex = 0
    let mostVotes = 0
    votes.forEach((value, index) => {
      if(value > mostVotes) {
        mostVotedIndex = index
        mostVotes = value
      }
    })
    return [mostVotedIndex, mostVotes]
  }

  //To not run the same function twice later
  const [mostVotedIndex, mostVotes] = mostVoted()

  if(mostVotes === 0) return (
    <div>
      <h1>Anecdote with the most votes</h1>
      <p>no votes cast yet</p>
    </div>
  )
  return ( 
    <div>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[mostVotedIndex]}
      <p> has {votes[mostVotedIndex]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(8))

  const handleNextAnecdote = () => { setSelected(Math.floor(Math.random()*anecdotes.length)) }
  const handleVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] = votesCopy[selected]+1
    setVotes(votesCopy)
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      this anecodte has {votes[selected]} votes
      <br />
      <Button text="next anecdote" onClick={handleNextAnecdote}/>
      <Button text="vote" onClick={handleVote}/>

      <TopAnecdote anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App