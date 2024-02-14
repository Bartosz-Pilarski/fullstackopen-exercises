import ToggleVisibility from "./ToggleVisibility"
import blogsService from "../services/blogs"
import { useState } from "react"

const Blog = ({ blog }) => {
  const {title, author, url, likes, id} = blog
  const [blogLikes, setBlogLikes] = useState(likes)

  const handleLiking = async (blogId) => {
    const likedBlog = await blogsService.like(blogId)
    setBlogLikes(likedBlog.likes)
  }

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
        <span>{blogLikes}</span>
        <button onClick={() => handleLiking(id)}>like</button>
      </div>
      <p>{url}</p>
      <p>{blog.user.username}</p>
      </ToggleVisibility>
    </div>  
  )
}

export default Blog