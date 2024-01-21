const express = require("express")
const morgan = require("morgan")


const app = express()

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

morgan.token('reqbody', (req, res) => { if(req.method === "POST") return JSON.stringify(req.body) })

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :reqbody"))

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)

    const person = persons.find((person) => person.id === id)
    if(!person) return res.status(404).end()
    
    res.json(person)
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)

    persons = persons.filter((person) => person.id !== id)
    res.status(204).end()
})

const generateId = (min = 1, max = 999999) => {
    return Math.floor(Math.random()*max)+min

}

app.post("/api/persons", (req, res) => {
    const id = generateId()
    const body = req.body
    
    if(!body.name || !body.number) return res.status(400).json({
        error: "Missing request content"
    })

    if(persons.find((person) => person.name.toLowerCase() === body.name.toLowerCase())) return res.status(400).json({
        error: "Name must be unique"
    })
    
    const person = {
        "id": id,
        "name": body.name,
        "number": body.number
    }

    persons = persons.concat(person)

    res.json(person)
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Lookin' fer swashbucklers on port ${PORT}`)
})