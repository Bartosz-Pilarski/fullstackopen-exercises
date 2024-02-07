const mongoose = require("mongoose")
const mongooseUniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ]
})

userSchema.plugin(mongooseUniqueValidator)

userSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  }
})

const User = mongoose.model("User", userSchema)

module.exports = User