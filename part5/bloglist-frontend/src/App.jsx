import { useState, useEffect } from 'react'
import Bloglist from './components/Bloglist'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      {user === null 
      ? <LoginForm setUser={setUser}/>
      : <Bloglist blogs={blogs} />}
    </div>
  )
}

export default App