import { useDispatch, useSelector } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

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
  const vote = (id, content) => {
    dispatch(voteFor(id))
    dispatch(setNotification(`You voted for "${content}"`, 5000))
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList