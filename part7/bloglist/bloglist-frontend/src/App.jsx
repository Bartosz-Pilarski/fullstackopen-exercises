import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import blogService from "./services/blogs"
import { initializeBlogs } from "./reducers/blogsReducer"

import Bloglist from "./components/Bloglist"
import Notification from "./components/Notification"
import ToggleVisibility from "./components/ToggleVisibility"

import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import { loadUser, logoutUser } from "./reducers/userReducer"


const App = () => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  //Get initial blogs and set up user if logged in
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(loadUser())
  }, [])

  // Log user out, delete localStorage of user.
  const handleLogout = () => {
    dispatch(logoutUser())
  }

  //If user is logged in, display blogs and allow for blog creation.
  const userLoggedIn = () => {
    return(
      <div>
        <Notification />
        <h1> Hello, {user.name} </h1>
        <button onClick={() => handleLogout()}>log out</button>
        <ToggleVisibility
          buttonLabels={{
            open: "Create new blog",
            close: "Cancel"
          }}
          ref={blogFormRef}
        >
          <BlogForm />
        </ToggleVisibility>
        <Bloglist />
      </div>
    )
  }

  //If user is not logged in, display login form
  const userNotLoggedIn = () => {
    return(
      <div>
        <Notification />
        <br/>
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      {
        user === null
          ? userNotLoggedIn()
          : userLoggedIn()
      }
    </div>
  )
}

export default App