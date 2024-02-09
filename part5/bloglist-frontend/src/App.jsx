import { useState, useEffect } from 'react'
import blogService from './services/blogs'

import Bloglist from './components/Bloglist'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
        <h1> Hello, {user.name} </h1>
        <button onClick={() => handleLogout()}>log out</button>
        <BlogForm blogs={blogs} setBlogs={setBlogs}/>
        <Bloglist blogs={blogs} />
      </div>
    )
  }

  return (
    <div>
      {user === null 
      ? <LoginForm setUser={setUser}/>
      : userLoggedIn()}
    </div>
  )
}

export default App