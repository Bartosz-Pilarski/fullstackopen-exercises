import { configureStore } from "@reduxjs/toolkit"

import notificationReducer from "./src/reducers/notificationReducer"
import blogsReducer from "./src/reducers/blogsReducer"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer
  }
})

export default store