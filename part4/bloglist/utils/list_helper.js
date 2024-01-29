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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}