/*  Joonatan Kuosa
 *  2019-08-26
 *
 *  Helsinki Fullstack MOOC
 *  Exercises 3.1 - 3.8
 */
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()

morgan.token('body', function(req, res) {
    if (req.method == 'POST')
        return `with params name=${req.body.name} number=${req.body.number}`
})

app.use(bodyParser.json())
app.use(morgan(':method :url :res[content-length] - :response-time ms :body'))

let people = [
    {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1
    },
    {
        name: 'Ada Lovelace',
        number: '39-44-5323523',
        id: 4
    },
    {
        name: 'Dan Abramov',
        number: '12-43-234345',
        id: 3
    },
    {
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
        id: 4
    }
]

app.get('/info', (req, res) => {
    const msg = `<p>Phonebook has info for ${people.length} people</p>
        <p>${new Date()}</p>`
    res.send(msg)
})

app.get('/api/persons', (req, res) => {
    res.send(people)
})

app.post('/api/persons', (req, res) => {
    const id = Math.floor(Math.random()*10000000)

    const person = req.body
    if (person.name.length === 0) {
        res.status(400).json({error: "name can't be empty"})
    }
    else if (person.number.length === 0) {
        res.status(400).json({error: "number can't be empty"})
    }
    else if (people.filter(x => x.name === person.name).length !== 0) {
        res.status(400).json({error: "name must be unique"})
    }
    else {
        person.id = id
        people = people.concat(person)
        res.json(person)
    }
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = people.find(x => x.id === id)

    if (person)
        res.send(person)
    else
        res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = people.find(x => x.id === id)

    if (person) {
        people = people.filter(x => x.id !== id)
        res.status(204).end()
    }
    else
        res.status(404).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
