import { useState } from "react"

const BlogComments = ({ blog }) => {
  const [comment, setComment] = useState("")

  const handleCommenting = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <h2>Comments</h2>
      <form onSubmit={() => handleCommenting()}>
        <input type="text" name="comment" />
        <button type="submit"> Comment </button>
      </form>
      <ul>
        {blog.comments.map((comment) => { return (
          <li key={comment.id}> {comment.content} </li>
        )})}
      </ul>
    </>
  )
}

export default BlogComments