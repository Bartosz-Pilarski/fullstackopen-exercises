import { useState } from "react"
import { useDispatch } from "react-redux"

import setNotification from "../reducers/notificationReducer"
import { loginUser } from "../reducers/userReducer"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser(username, password))
      setUsername("")
      setPassword("")
    } catch(err) {
      dispatch(setNotification({ content: "Invalid credentials", isError: true }, 3000))
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