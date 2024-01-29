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
    console.log(existing)
    if(existing !== -1) {
      bloggers.map((blogger, index) => {
        if(index === existing) return blogger.blogs += 1
      })
    }
    bloggers = bloggers.concat(bloggers, { author: blog.author, blogs: 1 })
  })

  let topBlogger = bloggers[0]

  bloggers.forEach((blogger) => {if(blogger.blogs >= topBlogger.blogs) topBlogger = blogger})
  return topBlogger
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}