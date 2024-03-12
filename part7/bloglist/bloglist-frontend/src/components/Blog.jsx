import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"

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

  // const Blogpost = styled.div`
  //   font-family: "Segoe UI";

  //   display: inline-flex;
  //   justify-content: flex-start;
  //   flex-direction: column;

  //   background-color: rgb(120, 5, 25);

  //   text-align: center;

  //   min-width: 7.5rem;
  //   min-height: 7.5rem;

  //   border-radius: 1rem;

  //   margin: 1rem;
  //   padding: 0.5rem;

  //   button {
  //     border: none;
  //     border-radius: 2px;
  //     margin: 0.25rem;
  //     padding: 0.5rem
  //   }
  // `
  // const Blogheader = styled.p`
  //   font-weight: bold;
  //   font-size: x-large;

  //   display: block;

  //   a {
  //     text-decoration: none;
  //     color: white;
  //   }
  // `
  // const Blogbody = styled.div`
  //     font-size: large;
  //     color: white;

  //     display: flex;
  //     flex-direction: column;
  //     justify-content: space-together;
  // `

  return(
    <div className="blogpost">
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