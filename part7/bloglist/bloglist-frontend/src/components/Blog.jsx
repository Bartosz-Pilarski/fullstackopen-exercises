import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import ToggleVisibility from "./ToggleVisibility"
import { deleteBlog, likeBlog } from "../reducers/blogsReducer"

const Blog = ({ blog }) => {
  const { title, author, url, likes, id, user } = blog
  const [blogLikes, setBlogLikes] = useState(likes)

  useEffect(() => {
    setBlogLikes(likes)
  }, [likes])

  const dispatch = useDispatch()

  const handleLiking = async (blogId) => {
    dispatch(likeBlog(blogId))
  }
  const handleDeletion = async (blogId) => {
    dispatch(deleteBlog(blogId))
  }

  const deleteButton = () => {
    if(blog.user.username === JSON.parse(window.localStorage.getItem("bloglistUser")).username) return (
      <button onClick={() => handleDeletion(id)}>
        Delete
      </button>
    )
  }
  return(
    <div className="blogpost" style={{ display: "inline-flex", flexDirection: "column", border: "2px solid black", margin: "0.2rem", padding: "0.25rem", textAlign: "center" }}>
      <p><Link to={`/blogs/${id}`}>{title}</Link></p>
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
        <p>{user.username}</p>
        {deleteButton()}
      </ToggleVisibility>
    </div>
  )
}

export default Blog