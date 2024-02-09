const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  res.status(200).json(blogs)
})

blogRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) { res.json(blog) }
  else { res.status(404).end() }
})

blogRouter.post("/", async (req, res) => {
  const body = req.body
  const user = req.user

  if(!user) return res.status(401).json({ error: "Invalid token" })
  if(!body.title) return res.status(400).json({ error: "No title provided" })
  if(!body.url) return res.status(400).json({ error: "No url provided" })

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: Number(body.likes) || 0,
    user: user.id
  })

  user.blogs = user.blogs.concat(blog)
  await user.save()

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogRouter.delete("/:id", async (req, res) => {
  const id = req.params.id
  const user = req.user
  if(!user) return res.status(401).json({ error: "Invalid token" })

  const blogToDelete = await Blog.findById(id)
  if(blogToDelete.user.toString() !== user._id.toString()) return res.status(401).json({ error: "User is not creator of the blog" })

  let userBlogs = user.blogs.filter((blog) => blog.toString() !== id)
  user.blogs = userBlogs

  await Blog.findByIdAndDelete(id)
  await user.save()

  res.status(204).end()
})

blogRouter.put("/:id", async (req, res) => {
  const id = req.params.id
  const { title, author, url, likes } = req.body

  if(!title) res.status(400).json({ error: "No title provided" })
  if(!url) res.status(400).json({ error: "No url provided" })

  const editedBlog = await Blog.findByIdAndUpdate(
    id,
    {
      title: title,
      author: author,
      url: url,
      likes: Number(likes) || 0
    },
    { new: true, runValidators: true, context: "query" })
  res.status(200).json(editedBlog)
})

module.exports = blogRouter