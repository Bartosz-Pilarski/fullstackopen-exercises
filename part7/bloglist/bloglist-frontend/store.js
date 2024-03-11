import { configureStore } from "@reduxjs/toolkit"

import notificationReducer from "./src/reducers/notificationReducer"
import blogsReducer from "./src/reducers/blogsReducer"
import userReducer from "./src/reducers/userReducer"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer
  }
})

export default store