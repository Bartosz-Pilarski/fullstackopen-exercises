const express = require("express")
const mongoose = require("mongoose")
require("express-async-errors")
const cors = require("cors")

//middleware & utility
const config = require("./utils/config")
const logger = require("./utils/logger")
const errorHandler = require("./utils/error_handler")
const middleware = require("./utils/middleware")

//routers
const blogRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

mongoose.set("strictQuery", false)
mongoose
  .connect(config.MONGO_URL)
  .then(() => logger.info("Connected to Mongo"))
  .catch((err) => logger.error(err.message))

const app = express()

app.use(cors())
app.use(express.json())
app.use(middleware.tokenDecoder)

app.use("/api/blogs", middleware.userExtractor, blogRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(errorHandler)

module.exports = app