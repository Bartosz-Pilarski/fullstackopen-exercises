const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
})

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Comment", commentSchema)
