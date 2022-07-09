require('dotenv').config()
const express = require('express')
let morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')


app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('body', (req, res)=>{
    return JSON.stringify(req.body);
})

app.use(morgan(':method :url - :response-time  ms :body'))


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

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`<div>Phonebook has info for ${persons.length} people</div> <br> <div>${(new Date())}</div> `)
  })
})


app.get('/api/persons/:id', (request, response) => {
    //const id = Number(request.params.id)
    //const person = persons.find(person => person.id === id)
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
    /*if (person) { 
        response.json(person)  
    } else { 
        response.status(404).end()  
    }*/
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })


  
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number ) {
      return response.status(400).json({ 
        error: 'Either name or number is missing' 
      })
    }/*else if(persons.find(person=> person.name.toLowerCase() == body.name.toLowerCase())){
        return response.status(400).json({ 
            error: `${body.name} already in phonebook.` 
        })
    }*/
    const person = new Person({
      ...body
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})