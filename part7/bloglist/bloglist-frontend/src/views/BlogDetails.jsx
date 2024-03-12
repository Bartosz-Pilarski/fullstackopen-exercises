import { useParams } from "react-router-dom"
import BlogInfo from "../components/BlogInfo"
import { useEffect, useState } from "react"
import blogsService from "../services/blogs"
import BlogComments from "../components/BlogComments"

const BlogDetails = () => {
  const id = useParams().id
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const initializeBlogData = async () => {
      const blogData = await blogsService.getBlogById(id)
      setBlog(blogData)
    }

    initializeBlogData()
  }, [])

  if(!blog) return (<h2> Blog not found </h2>)

  return (
    <>
      <BlogInfo blog={blog} />
      <BlogComments blog={blog} />
    </>

  )
}

export default BlogDetails