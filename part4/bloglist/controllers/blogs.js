const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
  res.status(200).json(blogs)
})

blogRouter.post("/", async (req, res) => {
  const body = req.body

  if(!body.title) res.status(400).json({ error: "No title provided" })
  if(!body.url) res.status(400).json({ error: "No url provided" })

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: Number(body.likes) || 0
  })

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogRouter.delete("/:id", async (req, res) => {
  const id = req.params.id

  await Blog.findOneAndDelete(id)
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