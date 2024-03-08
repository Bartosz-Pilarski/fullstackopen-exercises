const Notification = ({ notification }) => {
  const style = {
    border: "2px solid black"
  }

  if(notification === "" || notification === null) return null
  return (
    <h2 style={style}>
      {notification}
    </h2>
  )
}

export default Notification