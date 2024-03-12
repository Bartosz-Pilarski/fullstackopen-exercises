import { useDispatch } from "react-redux"
import { likeBlog } from "../reducers/blogsReducer"
import { useState } from "react"

const BlogInfo = ({ blog }) => {
  const dispatch = useDispatch()
  const [likes, setLikes] = useState(blog.likes)

  //Displayed blog info is not part of the actual blog state in redux store so it has to be manually handled a bit
  const handleLiking = (blogId) => {
    dispatch(likeBlog(blogId))
    setLikes(likes+1)
  }

  return (
    <div>
      <h2> {blog.title} </h2>
      <h3> by {blog.author} </h3>
      <a href={blog.url}>{blog.url}</a>
      <p>{likes} likes <button onClick={() => { handleLiking(blog.id) }}> Like</button></p>
    </div>
  )
}

export default BlogInfo