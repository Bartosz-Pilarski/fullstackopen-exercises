import { useState, useEffect } from 'react'
import blogService from './services/blogs'

import Bloglist from './components/Bloglist'
import Notification from './components/Notification'
import ToggleVisibility from './components/ToggleVisibility'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    content: null,
    isError: false
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(() => {
    const storedUserJSON = window.localStorage.getItem("bloglistUser")
    if(storedUserJSON) {
      const user = JSON.parse(storedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem("bloglistUser")
    setUser(null)
  }

  const userLoggedIn = () => {
    return(
      <div>
        <Notification notification={notification}/>
        <h1> Hello, {user.name} </h1>
        <button onClick={() => handleLogout()}>log out</button>
        <ToggleVisibility buttonLabels={{
          open: "Create new blog",
          close: "Cancel"
        }}> 
          <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification}/>
        </ToggleVisibility>
        <Bloglist blogs={blogs} />
      </div>
    )
  }

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
      {user === null 
      ? userNotLoggedIn()
      : userLoggedIn()}
    </div>
  )
}

export default App