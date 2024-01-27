const mongoose = require("mongoose")

if(process.argv.length < 3) {
  console.log(`
        Please enter in your password or password, contact name and phone number. (separated by spaces) \n
        Password only: display all entries in the phonebook \n
        Password, contact name, and phone number: Add new entry to phonebook
        `)
  process.exit(1)
}

const modeSetup = () => {
  let mode, contactName, contactPhone
  switch (process.argv.length) {
  case 5:
    console.log("MODE - ADD ENTRY")
    mode = "ADD"
    contactName = process.argv[3]
    contactPhone = process.argv[4]
    return [mode, contactName, contactPhone]
  case 3:
    console.log("MODE - DISPLAY ENTRIES")
    mode = "DISPLAY"
    return [mode, undefined, undefined]
  default:
    console.log("Error: Incorrect number of parameters.")
    process.exit(1)
  }
}

const password = process.argv[2]
const [mode, contactName, contactPhone] = modeSetup(process.argv)


const dbname = "phonebook"
const url = `mongodb://bpilarski2003:${password}@ac-f5bakit-shard-00-00.sj6bwok.mongodb.net:27017,ac-f5bakit-shard-00-01.sj6bwok.mongodb.net:27017,ac-f5bakit-shard-00-02.sj6bwok.mongodb.net:27017/${dbname}?ssl=true&replicaSet=atlas-13dzeh-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = new mongoose.model("Person", personSchema)

if(mode === "DISPLAY") {
  Person.find({}).then((result) => {
    console.log("Phonebook:")
    result.forEach((person) => console.log(`${person.name} - ${person.number}`))
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: contactName,
    number: contactPhone,
  })

  person.save().then(() => {
    console.log("Contact saved successfully")
    mongoose.connection.close()
  })
}