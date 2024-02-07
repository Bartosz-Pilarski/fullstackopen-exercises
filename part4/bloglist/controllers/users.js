const usersRouter = require("express").Router()
const bcrypt = require("bcrypt")

const User = require("../models/user")

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body

  if(!username) res.status(400).json({ error: "Username required" })
  if(!name) res.status(400).json({ error: "Name required" })
  if(!password) res.status(400).json({ error: "Password required" })

  const saltingRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltingRounds)

  const hashedUser = new User({
    username: username,
    name: name,
    passwordHash: hashedPassword
  })

  const newUser = await hashedUser.save()
  res.status(200).json(newUser)
})

module.exports = usersRouter