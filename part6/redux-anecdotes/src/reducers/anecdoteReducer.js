import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const anecdotesAfterVote = state.map((anec) => anec.id === action.payload ? { ...anec, votes: anec.votes+1 } : anec)
      return anecdotesAfterVote.toSorted((a, b) => b.votes - a.votes)
    },
    createAnecdote(state, action) {
      return [...state, asObject(action.payload)]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteFor, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer