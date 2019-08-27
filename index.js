/*  Joonatan Kuosa
 *  2019-08-26
 *
 *  Helsinki Fullstack MOOC
 *  Exercises 3.1 - 3.8, 3.13 - 3.17
 *
 *  REQUIRES following env variables to be set (in .env file)
 *  USERNAME
 *  PASSWORD
 *  MONGODB_URL
 */
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongo = require('./mongo')

const PORT = process.env.PORT || 3001

const app = express()
app.use(cors())

morgan.token('body', function(req, res) {
    if (req.method == 'POST')
        return `with params name=${req.body.name} number=${req.body.number}`
})

app.use(bodyParser.json())
app.use(morgan(':method :url :res[content-length] - :response-time ms :body'))


mongo.connect(process.env.USERNAME, process.env.PASSWORD, process.env.MONGODB_URL)

app.get('/info', (req, res, next) => {
    mongo.count().then(results => {
        const msg = `<p>Phonebook has info for ${results.length} people</p>
            <p>${new Date()}</p>`
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
    if (person.name.length === 0) {
        res.status(400).json({error: "name can't be empty"})
    }
    else if (person.number.length === 0) {
        res.status(400).json({error: "number can't be empty"})
    }
    /* TODO fix
    else if (people.filter(x => x.name === person.name).length !== 0) {
        res.status(400).json({error: "name must be unique"})
    }
    */
    else {
        mongo.save(person.name, person.number).then(() => {
            console.log(`added ${person.name} number ${person.number}`)
        })
        .catch(error => next(error))
        res.json(person)
    }
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = Number(req.params.id)

    mongo.list().then(results => {
        if (isNaN(id)) {
            throw {name: 'isNaN' }
        }
        else if (results.length <= id) {
            res.status(404).end()
        }
        else {
            const person = results[id]
            res.send(person)
        }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const data = req.body
    const id = Number(req.params.id)

    mongo.list().then(results => {
        if (isNaN(id)) {
            throw {name: 'isNaN' }
        }
        else if (results.length <= id) {
            res.status(404).end()
        }
        else {
            const person = results[id]
            person.name = data.name
            person.number = data.number
            person.save().then(() => {
                res.status(204).end()
            })
            .catch(error => next(error))
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = Number(req.params.id)

    mongo.list().then(results => {
        if (results.length <= id)
            res.status(404).end()
        else {
            const person = results[id]
            console.log(`Removing: ${person.name}`)
            mongo.remove(person)
            res.status(204).end()
        }
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'uknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformed id' })
    }
    else if (error.name === 'isNaN') {
        return res.status(400).send({ error: 'malformed index' })
    }
    else if (error.name === 'ValidationError') {
        return res.status(400).send({ error: 'missing name or number' })
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
