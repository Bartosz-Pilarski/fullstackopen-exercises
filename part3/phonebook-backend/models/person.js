const mongoose = require("mongoose")

const url = process.env.MONGO_URL

mongoose.set("strictQuery", false)
mongoose
    .connect(url)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((error) => console.log("Error while connecting to MongoDB: ", error.message))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: String,
})

personSchema.set('toJSON', {
    transform: (docIn, objOut) => {
        objOut.id = objOut._id.toString()
        delete objOut._id
        delete objOut.__v
    }
  })

module.exports = mongoose.model("Person", personSchema)