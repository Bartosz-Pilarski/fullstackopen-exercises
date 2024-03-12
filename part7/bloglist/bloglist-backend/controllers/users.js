const usersRouter = require("express").Router()
const bcrypt = require("bcrypt")

const User = require("../models/user")

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body

  if (!username) res.status(400).json({ error: "Username required" })
  if (!name) res.status(400).json({ error: "Name required" })
  if (!password) res.status(400).json({ error: "Password required" })

  if (username.length < 3)
    res
      .status(400)
      .json({ error: "Username must be at least 3 characters long" })
  if (password.length < 3)
    res
      .status(400)
      .json({ error: "Password must be at least 3 characters long" })

  const saltingRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltingRounds)

  const hashedUser = new User({
    username: username,
    name: name,
    passwordHash: hashedPassword,
  })

  const newUser = await hashedUser.save()
  res.status(200).json(newUser)
})

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    likes: 1,
    url: 1,
  })
  res.status(200).json(users)
})

usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id).populate("blogs", {
    title: 1,
    author: 1,
    likes: 1,
    url: 1,
  })
  res.status(200).json(user)
})

usersRouter.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = usersRouter
