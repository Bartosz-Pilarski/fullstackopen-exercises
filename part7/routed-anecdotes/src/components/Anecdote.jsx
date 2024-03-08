const Anecdote = ({ anecdote }) => {
  return(
    <div>
      <p>{anecdote.content}</p>
      <p>by {anecdote.author}</p>
      <p>at {anecdote.info}</p>
      <p>votes: {anecdote.votes}</p>
    </div>
  )
}

export default Anecdote