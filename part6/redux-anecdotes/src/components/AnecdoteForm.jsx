import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

import anecdotesService from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const postAnecdote = async (event) => {
    event.preventDefault()
    const newAnecdote = await anecdotesService.createNew(event.target.anecdote.value)
    dispatch(createAnecdote(newAnecdote))
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={postAnecdote}>
        <div><input type='text' name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm