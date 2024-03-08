import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useField } from "../hooks"

const CreateNew = ({addNew, setNotification}) => {  
  const content = useField('text')
  const author = useField('text')
  const info = useField('url')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    setNotification(`Anecdote: ${content.value} added`)
    navigate('/anecdotes')
  }

  const handleReset = (event) => {
    event.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content.setup} />
        </div>
        <div>
          author
          <input name='author' {...author.setup} />
        </div>
        <div>
          url for more info
          <input name='info' {...info.setup} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew