import { useState } from "react"
import loginService from "../services/login"
import blogsService from "../services/blogs"

const LoginForm = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username, password })

      window.localStorage.setItem("bloglistUser", JSON.stringify(loggedInUser))
      blogsService.setToken(loggedInUser.token)
      setUser(loggedInUser)
      setUsername("")
      setPassword("")
    } catch(err) {
      setNotification({content: `Invalid credentials`, isError: true})
      setTimeout(() => {
        setNotification({content: null, isError: false})
      }, 3000);
    }
  }
  return(
    <form onSubmit={handleLogin}>
      <div>
        username
        <input 
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)} 
          name="username"
        />
      </div>
      <div>
        password
        <input 
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)} 
          name="password"
        />
      </div>
      <button type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm