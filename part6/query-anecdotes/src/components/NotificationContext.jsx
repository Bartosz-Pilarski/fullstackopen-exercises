import { useReducer, createContext } from "react"

const NotificationReducer = (state, action) => {
  switch(action.type) {
    case "SET":
      return action.payload
    case "RESET":
      return null
    default: 
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(NotificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext