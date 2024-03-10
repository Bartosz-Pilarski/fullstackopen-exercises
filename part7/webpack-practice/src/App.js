import React, { useState } from 'react'

import { useNotes } from './hooks'
import './index.css'

const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])

  const url = 'https://notes2023.fly.dev/api/notes'
  const notes = useNotes(url)

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }

  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick}>
        press
      </button>

      <div> 
        {notes.length} notes on server {url}
      </div>
    </div>
  )
}

export default App