const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
})

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Blog", blogSchema)
