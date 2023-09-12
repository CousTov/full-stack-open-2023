require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', req => {
    return req.method === 'POST' ? JSON.stringify(req.body) : null
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [

]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(p => {
        response.json(p)
    })
})

app.get('/api/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people <br /> ${Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.name === undefined && body.number === undefined) {
      return response.status(400).json({ error: 'Content missing' })
    }
  
    const person = new Person({
      name: body.name,
      number: body.number
    })
  
    person.save().then(savedNote => {
      response.json(savedNote)
    })
  })

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(person => person.id))
      : 0
    return maxId + 1
  }

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: `Data Missing`
        })
    } else if (persons.some(check => check.name === body.name)){
        return response.status(409).json({
            error: "Name must be unique"
        })
    }

    const personObject = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(personObject)
    response.json(persons)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})