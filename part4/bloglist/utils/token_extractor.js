const decodeTokenFrom = async (req, res, next) => {
  const authHeader = await req.get("Authorization")
  if(authHeader && (await authHeader.startsWith("Bearer "))) {
    req.token = await authHeader.replace("Bearer ", "")
    next()
  } else {
    req.token = undefined
    next()
  }

}

module.exports = decodeTokenFrom