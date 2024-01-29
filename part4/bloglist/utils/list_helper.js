//Doesn't take blogs as an argument anymore for linter reasons
const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, current) => sum+current.likes, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) return {}

  let max = blogs[0]
  blogs.forEach((blog) => {if(blog.likes >= max.likes) max = blog})
  return max
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0) return {}

  let bloggers = []

  // Go through every blog, attempt to find the author in the list of already known ones, if found - increment blogs by one. If not, create a new author with one blog.
  blogs.forEach((blog) => {
    const existing = bloggers.findIndex((blogger) => { return blog.author === blogger.author })
    if(existing === -1) return bloggers = bloggers.concat({ author: blog.author, blogs: 1 })

    bloggers[existing] = { author: bloggers[existing].author, blogs: bloggers[existing].blogs += 1 }
  })

  let topBlogger = bloggers[0]

  console.log("bloggers: ", bloggers)

  bloggers.forEach((blogger) => { if(blogger.blogs >= topBlogger.blogs) topBlogger = blogger})
  console.log("top blogger: ", topBlogger)
  return topBlogger
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}