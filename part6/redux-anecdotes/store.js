import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './src/reducers/anecdoteReducer'
import filterReducer from './src/reducers/filterReducer'
import notificationReducer from './src/reducers/notificationReducer'

const store = configureStore({
  reducer: {
    filter: filterReducer,
    anecdotes: anecdoteReducer,
    notification: notificationReducer
  }
})

export default store