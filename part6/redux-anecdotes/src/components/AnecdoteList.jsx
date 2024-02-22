import { useDispatch, useSelector } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if(filter === '') return anecdotes
    return anecdotes.filter(anecdote => {
      const substring = anecdote.content.substring(0, filter.length).toLowerCase()
      const adjustedFilter = filter.toLowerCase()
      return substring === adjustedFilter
    })
  })
  const dispatch = useDispatch()
  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))
  }
  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList