const User = require("../models/user")
const jwt = require("jsonwebtoken")

const tokenDecoder = async (req, res, next) => {
  const authHeader = await req.get("Authorization")
  if (authHeader && (await authHeader.startsWith("Bearer "))) {
    req.token = await authHeader.replace("Bearer ", "")
    next()
  } else {
    req.token = undefined
    next()
  }
}

// has to be loaded after tokenDecoder
const userExtractor = async (req, res, next) => {
  const token = req.token
  if (!token) {
    req.user = undefined
    return next()
  }

  const decodedToken = await jwt.verify(req.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  req.user = user || undefined
  next()
}

module.exports = {
  tokenDecoder,
  userExtractor,
}
