import Blog from "./Blog"

const Bloglist = ({ blogs, handleDeletion }) => {
  return(
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleDeletion={handleDeletion} />
      )}
    </div>
  )
}

export default Bloglistnotification