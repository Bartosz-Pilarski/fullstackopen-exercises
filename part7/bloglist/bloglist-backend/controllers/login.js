const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()

const User = require("../models/user")

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body

  if (!username) res.status(400).json({ error: "Username required" })
  if (!password) res.status(400).json({ error: "Password required" })

  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!user || !passwordCorrect)
    return res.status(401).json({ error: "Invalid username or password" })

  const userToEncrypt = {
    username: user.username,
    id: user._id,
  }

  const token = await jwt.sign(userToEncrypt, process.env.SECRET)

  res.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
