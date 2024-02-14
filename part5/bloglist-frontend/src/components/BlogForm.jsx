import { useState } from "react"

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    addBlog(newBlog)

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
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        author
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url
          <input
            type="text"
            name="url"
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