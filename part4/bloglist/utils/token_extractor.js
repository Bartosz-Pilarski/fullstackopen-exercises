const decodeTokenFrom = async (req, res, next) => {
  const authHeader = await req.get("Authorization")
  if(!authHeader || !(await authHeader.startsWith("Bearer "))) { req.token = undefined; next() }
  req.token = await authHeader.replace("Bearer ", "")
  next()
}

module.exports = decodeTokenFrom