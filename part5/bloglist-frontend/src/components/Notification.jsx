const Notification = ({notification}) => {
  const { content, isError } = notification
  if(!content) return null 

  const notificationStyle = {
    display: "inline",
    color: "rgb(50, 255, 50)",
    backgroundColor: "rgb(25, 100, 25)",
    fontWeight: "bold",
    fontSize: "2rem",
    padding: "0.5rem",
    border: "0.25rem solid green"
  }

  const errorStyle = {
    display: "inline",
    color: "rgb(255, 50, 50)",
    backgroundColor: "rgb(100, 25, 25)",
    fontWeight: "bold",
    fontSize: "2rem",
    padding: "0.5rem",
    border: "0.25rem solid red"
  }
  
  return(
    <div style={isError ? errorStyle : notificationStyle}>
      {content}
    </div>
  )
}

export default Notification