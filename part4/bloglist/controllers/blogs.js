const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
  res.status(200).json(blogs)
})

blogRouter.post("/", async (req, res) => {
  const body = req.body

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