import { createSlice } from "@reduxjs/toolkit"

import blogsService from "../services/blogs"
import loginService from "../services/login"
import { setNotification } from "./notificationReducer"

const initialState = null

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    resetUser: (state, action) => {
      return initialState
    }
  }
})

export const { setUser, resetUser } = userSlice.actions

export const loadUser = () => {
  return async (dispatch) => {
    const storedUserJSON = window.localStorage.getItem("bloglistUser")
    if(storedUserJSON) {
      const user = JSON.parse(storedUserJSON)
      dispatch(setUser(user))
      blogsService.setToken(user.token)
    }
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const loggedInUser = await loginService.login({ username, password })

      window.localStorage.setItem("bloglistUser", JSON.stringify(loggedInUser))
      blogsService.setToken(loggedInUser.token)
      dispatch(setUser(loggedInUser))
      dispatch(setNotification({ isError: false, content: `Welcome, ${username}` }, 3000))
    } catch (error) {
      dispatch(setNotification({ isError: true, content: "invalid credentials" }, 3000))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("bloglistUser")
    dispatch(resetUser())
  }
}

export default userSlice.reducer