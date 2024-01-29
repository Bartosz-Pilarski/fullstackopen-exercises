//Doesn't take blogs as an argument anymore for linter reasons
const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, current) => sum+current.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}