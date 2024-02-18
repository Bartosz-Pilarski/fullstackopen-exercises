import ToggleVisibility from "./ToggleVisibility"
import blogService from "../services/blogs"
import { useState } from "react"

const Blog = ({ blog, handleDeletion }) => {
  const { title, author, url, likes, id } = blog
  const [blogLikes, setBlogLikes] = useState(likes)

  const handleLiking = async (blogId) => {
    const likedBlog = await blogService.like(blogId)
    setBlogLikes(likedBlog.likes)
  }

  const deleteButton = () => {
    if(blog.user.username === JSON.parse(window.localStorage.getItem("bloglistUser")).username) return (
      <button onClick={() => handleDeletion(id)}>
        Delete
      </button>
    )
  }
  return(
    <div style={{ display: "inline-flex", flexDirection: "column", border: "2px solid black", margin: "0.2rem", padding: "0.25rem", textAlign: "center" }}>
      <p>{title}</p>
      <ToggleVisibility
        buttonLabels={{
          open: "View details",
          close: "Hide details"
        }}
      >
        <p>{author}</p>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
          <span>{blogLikes}</span>
          <button onClick={() => handleLiking(id)}>like</button>
        </div>
        <p>{url}</p>
        <p>{blog.user.username}</p>
        {deleteButton()}
      </ToggleVisibility>
    </div>
  )
}

export default Blog