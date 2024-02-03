const express = require("express")
const mongoose = require("mongoose")
require("express-async-errors")
const cors = require("cors")
const config = require("./utils/config")
const logger = require("./utils/logger")

const blogRouter = require("./controllers/blogs")

mongoose.set("strictQuery", false)
mongoose
  .connect(config.MONGO_URL)
  .then(() => logger.info("Connected to Mongo"))
  .catch((err) => logger.error(err.message))

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogRouter)

module.exports = app