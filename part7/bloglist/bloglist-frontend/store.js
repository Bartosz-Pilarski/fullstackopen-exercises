import { configureStore } from "@reduxjs/toolkit"

import notificationReducer from "./src/reducers/notificationReducer"
import blogsReducer from "./src/reducers/blogsReducer"
import userReducer from "./src/reducers/userReducer"
import usersReducer from "./src/reducers/usersReducer"

/*
  user -> logged in user
  users -> generic user data
*/

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer
  }
})

export default store