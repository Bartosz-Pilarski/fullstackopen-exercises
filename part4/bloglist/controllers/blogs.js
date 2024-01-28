const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const logger = require("../utils/logger")

blogRouter.get("/", (req, res) => {
  Blog
    .find({})
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => logger.error(err))
})

blogRouter.post("/", (req, res) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch((err) => logger.error(err))
})

module.exports = blogRouter