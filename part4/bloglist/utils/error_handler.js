const logger = require("./logger")

const handler = (err, req, res, next) => {
  logger.error(err.message)

  if(err.name === "CastError") return res.status(400).send({ error: "bad id formatting" })
  if(err.name === "ValidationError") return res.status(400).send({ error: err.message })
  if(err.name === "JsonWebTokenError") return res.status(401).json({ error: err.message })
  if(err.name === "TokenExpiredError") return res.status(401).json({ error: "token expired" })

  next(err)
}

module.exports = handler