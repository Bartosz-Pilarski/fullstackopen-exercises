import { useSelector } from "react-redux"
import Blog from "./Blog"

const Bloglist = ({ handleDeletion }) => {
  const blogs = useSelector(state => state.blogs)

  return(
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleDeletion={handleDeletion} />
      )}
    </div>
  )
}

export default Bloglist