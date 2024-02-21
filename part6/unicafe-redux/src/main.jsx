import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const goodRating = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const okRating = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const badRating = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const resetRatings = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const currentRatings = store.getState()
  return (
    <div>
      <button onClick={goodRating}>good</button> 
      <button onClick={okRating}>ok</button> 
      <button onClick={badRating}>bad</button>
      <button onClick={resetRatings}>reset stats</button>
      <div>good {currentRatings.good}</div>
      <div>ok {currentRatings.ok}</div>
      <div>bad {currentRatings.bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)