require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

const Person = require("./models/person")

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(express.static("dist"))
app.use(cors())

morgan.token('reqbody', (req, res) => { if(req.method === "POST") return JSON.stringify(req.body) })
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :reqbody"))

app.get("/api/persons", (req, res) => {
    Person.find({})
        .then((persons) => res.json(persons))
})

app.get("/api/persons/:id", (req, res) => {
    Person.findById(req.params.id)
        .then((person) => res.json(person))
        .catch((err) => res.status(404).end())
})

app.delete("/api/persons/:id", (req, res) => {
    Person.findByIdAndDelete(req.params.id)
        .then((result) => res.status(204).end())
        .catch((error) => console.log(error.message))
})

app.post("/api/persons", (req, res) => {
    const body = req.body
    
    if(!body.name || !body.number) return res.status(400).json({
        error: "Missing request content"
    })

    Person.exists({ name: body.name.toLowerCase() }).then((result) => {
        if(result !== null) return res.status(400).json({
            error: "Name must be unique"
        })
        const person = new Person({
            "name": body.name,
            "number": body.number
        })
    
        person.save().then((person) => res.json(person))
    })
})

app.get("/info", (req, res) => {
    const date = new Date()
    res.send(`
        <p> The phonebook has info for ${persons.length} people </p>

        <br/>

        <div>
            <p> Request received at:
            <p> ${date} </p>
        </div>
    `)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Lookin' fer swashbucklers on port ${PORT}`)
})