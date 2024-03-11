import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

import blogService from "./services/blogs"
import { initializeBlogs } from "./reducers/blogsReducer"

import Bloglist from "./components/Bloglist"
import Notification from "./components/Notification"
import ToggleVisibility from "./components/ToggleVisibility"

import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"


const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  /*
    ------------------
          EFFECTS
    ------------------
  */

  //Get initial blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  //Set up user if logged in
  useEffect(() => {
    const storedUserJSON = window.localStorage.getItem("bloglistUser")
    if(storedUserJSON) {
      const user = JSON.parse(storedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  /*
    ------------------
        FUNCTIONS
    ------------------
  */

  // Log user out, delete localStorage of user.
  const handleLogout = () => {
    window.localStorage.removeItem("bloglistUser")
    setUser(null)
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
        <LoginForm setUser={setUser}/>
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