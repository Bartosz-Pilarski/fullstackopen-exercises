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
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    content: null,
    isError: false
  })

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

  // Save blog to database, toggle visibility of form.
  // const addBlog = async (newBlog) => {
  //   blogFormRef.current.handleToggleVisibility()
  //   try{
  //     const savedBlog = await blogService.create(newBlog)

  //     setBlogs(blogs.concat(savedBlog))
  //     setNotification({ content: `Blog ${savedBlog.title} created succesfully`, isError: false })

  //     setTimeout(() => {
  //       setNotification({ content: null, isError: false })
  //     }, 3000)
  //   } catch(err) {
  //     setNotification({ content: "Error while creating blog", isError: true })
  //     setTimeout(() => {
  //       setNotification({ content: null, isError: false })
  //     }, 3000)
  //   }
  // }

  const deleteBlog = async (blogId) => {
    if(window.confirm("Do you really want to delete this blog?")) {
      await blogService.deleteBlog(blogId)
      const blogsAfterDeletion = blogs.filter((blog) => blog.id !== blogId)
      setBlogs(blogsAfterDeletion)
    }
  }

  // Log user out, delete localStorage of user.
  const handleLogout = () => {
    window.localStorage.removeItem("bloglistUser")
    setUser(null)
  }

  //If user is logged in, display blogs and allow for blog creation.
  const userLoggedIn = () => {
    return(
      <div>
        <Notification notification={notification}/>
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
        <Bloglist handleDeletion={deleteBlog}/>
      </div>
    )
  }

  //If user is not logged in, display login form
  const userNotLoggedIn = () => {
    return(
      <div>
        <Notification notification={notification}/>
        <br/>
        <LoginForm setUser={setUser} setNotification={setNotification}/>
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