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

module.exports = blogRouter