import { Alert } from "react-bootstrap"

const Notification = ({ notification }) => {
  if(notification.content === "" || notification.content === undefined) return null

  return (
    <Alert variant={notification.variant}>
      {notification.content}
    </Alert>
  )
}

export default Notification