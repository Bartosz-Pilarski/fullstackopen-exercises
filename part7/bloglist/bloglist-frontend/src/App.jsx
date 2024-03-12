import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, logoutUser } from "./reducers/userReducer"
import { Routes, Route } from "react-router-dom"

import { initializeBlogs } from "./reducers/blogsReducer"
import { initializeUsers } from "./reducers/usersReducer"

import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Menu from "./components/Menu"

import Blogs from "./views/Blogs"
import Users from "./views/Users"
import UserDetails from "./views/UserDetails"
import BlogDetails from "./views/BlogDetails"


const App = () => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  //Get initial blogs and set up user if logged in
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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
        <Menu />
        <Notification />
        <h1> Hello, {user.name} </h1>
        <button onClick={() => handleLogout()}>log out</button>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />}/>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
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
    <div className="container">
      {
        user === null
          ? userNotLoggedIn()
          : userLoggedIn()
      }
    </div>
  )
}

export default App