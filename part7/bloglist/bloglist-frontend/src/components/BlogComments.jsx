import { useDispatch } from "react-redux"
import { useState } from "react"

import { useField } from "../hooks"
import { commentOnBlog } from "../reducers/blogsReducer"
import blogsService from "../services/blogs"

const BlogComments = ({ blog }) => {
  const dispatch = useDispatch()
  const [comments, setComments] = useState(blog.comments)

  const comment = useField("text")

  const handleCommenting = async (event) => {
    event.preventDefault()
    const newComment = { content: comment.value }
    await dispatch(commentOnBlog(blog.id, newComment))

    const updatedComments = await blogsService.getCommentsById(blog.id)
    setComments(updatedComments)

    comment.reset()
  }

  return (
    <>
      <h2>Comments</h2>
      <form onSubmit={handleCommenting}>
        <input name="comment" {...comment.setup} />
        <button type="submit"> Comment </button>
      </form>
      <ul>
        {comments.map((comment) => { return (
          <li key={comment.id}> {comment.content} </li>
        )})}
      </ul>
    </>
  )
}

export default BlogComments