import ToggleVisibility from "./ToggleVisibility"

const Blog = ({ blog }) => {
  console.log(blog.user)
  const {title, author, url, likes} = blog
  return(
    <div style={{display: "inline-flex", flexDirection: "column", border: "2px solid black", margin: "0.2rem", padding: "0.25rem", textAlign: "center"}}>
      <p>{title}</p>
      <ToggleVisibility
        buttonLabels={{
          open: "View details",
          close: "Hide details"
        }}
      >
      <p>{author}</p>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
        <span>{likes}</span>
        <button >like</button>
      </div>
      <p>{url}</p>
      <p>{blog.user.username}</p>
      </ToggleVisibility>
    </div>  
  )
}

export default Blog