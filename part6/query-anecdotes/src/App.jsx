import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import { getAnecdotes, voteForAnecodte } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useContext } from 'react'
import NotificationContext from './components/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()

  const [notification, dispatchNotification] = useContext(NotificationContext)

  const voteMutation = useMutation({
    mutationFn: voteForAnecodte,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
    dispatchNotification({ type: "SET", payload: `${anecdote.content} voted` })
  }

  const anecdotes = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })



  if(anecdotes.isLoading) {
    return (
      <h2>Loading data...</h2>
    )
  }
  if(anecdotes.isError) {
    return (
      <h2>Website unavailable due to server issues.</h2>
    )
  }
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
