const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE': {
      const anecdotesAfterVote = state.map((anec) => anec.id === action.payload ? { ...anec, votes: anec.votes+1 } : anec)
      return anecdotesAfterVote.toSorted((a, b) => b.votes - a.votes)
    }
    //Doesn't need to be sorted, unless there's negative values. Adding a new anecdote will always put it at the end with 0 votes
    case 'CREATE':
      return [...state, asObject(action.payload)]
    default: return state
  }
}

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    payload: id
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE',
    payload: content
  }
}

export default reducer