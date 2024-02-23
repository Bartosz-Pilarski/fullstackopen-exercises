import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload.toSorted((a, b) => b.votes - a.votes)
    },
    replaceAnecdote(state, action) {
      const anecdotesAfterVote = state.map((anec) => anec.id === action.payload.id ? action.payload : anec)
      return anecdotesAfterVote.toSorted((a, b) => b.votes - a.votes)
    } 
  }
})

export const { replaceAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteFor = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.voteForId(id)
    dispatch(replaceAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer