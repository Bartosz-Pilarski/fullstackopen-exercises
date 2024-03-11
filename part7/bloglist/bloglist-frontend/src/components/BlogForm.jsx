import { useState } from "react"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { addBlog } from "../reducers/blogsReducer"

const BlogForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const dispatch = useDispatch()

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }

    try {
      dispatch(addBlog(newBlog))
      dispatch(setNotification({ isError: false, content: `Blog ${title} created!` }, 5000))
    } catch (error) {
      dispatch(setNotification({ isError: true, content: "Error while creating blog" }, 3000))
    }

    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <h1>Create New Blog</h1>
      <form onSubmit={handleBlogCreation}>
        <div>
          title
          <input
            type="text"
            name="title"
            placeholder="Name the blog"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        author
          <input
            type="text"
            name="author"
            placeholder="Name the author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url
          <input
            type="text"
            name="url"
            placeholder="blogurl.com"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">
          Create
        </button>
      </form>
    </div>

  )
}

export default BlogForm