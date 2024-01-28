const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const blogRouter = require("./controllers/blogs")

mongoose.set("strictQuery", false)
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => { console.log('Connected to Mongo')})
    .catch((err) => console.log(err.message))

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogRouter)

module.exports = app