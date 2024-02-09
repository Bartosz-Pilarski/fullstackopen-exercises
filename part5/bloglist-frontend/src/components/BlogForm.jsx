import { useState } from "react"
import blogsService from "../services/blogs"

const BlogForm = ({ blogs, setBlogs, setNotification }) => {
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
    try{
      const savedBlog = await blogsService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))

      setNotification({content: `Blog ${savedBlog.title} created succesfully`, isError: false})
      setTimeout(() => {
        setNotification({content: null, isError: false})
      }, 3000);
    } catch(err) {
      setNotification({content: `Error while creating blog`, isError: true})
      setTimeout(() => {
        setNotification({content: null, isError: false})
      }, 3000);
    }
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