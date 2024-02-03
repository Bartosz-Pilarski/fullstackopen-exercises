const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "Why you shouldn't trust dwarves",
    author: "John Leaflover",
    url: "https://example.com",
    likes: 7
  },
  {
    title: "Kilts, not skirts.",
    author: "The Highlander",
    url: "https://albagubrath.uk",
    likes: 13
  },  {
    title: "Burying Treasure for Dummies",
    author: "Captain William Kidd",
    url: "https://seamen.com",
    likes: 7
  },  {
    title: "I have anger issues, please, let me leave",
    author: "Jonathan ForHonor",
    url: "https://forhonorgame.com",
    likes: 7
  },
]

//For some reason, this function throws an error - client not connected
//HOWEVER calling the same code within tests doesn't.
const blogsInDb = async () => {
  const blogs = await Blog.find({})

  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}