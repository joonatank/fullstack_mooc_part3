/*  Joonatan Kuosa
 *  2019-08-26
 *
 *  Helsinki Fullstack MOOC
 *  Exercises 3.1 - 3.8, 3.13 - 3.20
 *
 *  REQUIRES following env variables to be set (in .env file)
 *  USERNAME
 *  PASSWORD
 *  MONGODB_URL
 */
require('dotenv').config()
const express = require('express')
const process = require('process')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongo = require('./mongo')

const PORT = process.env.PORT || 3001

const app = express()
app.use(cors())

morgan.token('body', req => {
    if (req.method === 'POST')
        return `with params name=${req.body.name} number=${req.body.number}`
})

app.use(bodyParser.json())
app.use(morgan(':method :url :res[content-length] - :response-time ms :body'))


mongo.connect(process.env.USERNAME, process.env.PASSWORD, process.env.MONGODB_URL)

app.get('/info', (req, res, next) => {
    mongo.count().then(n => {
        const msg = `
            <p>Phonebook has info for ${n} people</p>
            <p>${new Date()}</p>
            `
        res.send(msg)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
    mongo.list().then(results => {
        res.send(results)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const person = req.body

    mongo.save(person.name, person.number).then(() => {
        console.log(`added ${person.name} number ${person.number}`)
        res.json(person)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id

    mongo.get(id).then(person => {
        res.send(person)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const data = req.body
    const id = req.params.id

    mongo.get(id).then(person => {
        person.name = data.name
        person.number = data.number
        person.save().then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id

    mongo.remove(id).then(() => {
        console.log(`Removed: ${id}`)
        res.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'uknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(`ERROR: ${error.message}`)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformed id' })
    }
    else if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

process.on('SIGINT', () => {
    mongo.disconnect()
    process.exit(0)
})
