const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/", (req, res) => {
  Blog
    .find({})
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => console.log(err))
})

blogRouter.post("/", (req, res) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter