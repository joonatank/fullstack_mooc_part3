/*  Joonatan Kuosa
 *  2019-08-26
 *
 *  Helsinki Fullstack MOOC
 *  Exercises 3.13 - 3.14
 */

const mongoose = require('mongoose')

const db_name = 'test'
const params = 'retryWrites=true&w=majority'

const peopleSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', peopleSchema)

const connect = (username, password, server_url) => {
    const url = `mongodb+srv://${username}:${password}@${server_url}/${db_name}?${params}`
    mongoose.connect(url, { useNewUrlParser: true })
}

const disconnect = () => {
    mongoose.connection.close()
}

const save = (name, number) => {
    const person = new Person({
        name: name,
        number: number
    })

    return person.save()
}

const remove = (doc) => {
    const q = Person.findByIdAndDelete(doc._id)
    return q.exec()
}

const count = () => {
    return Person.count({})
}

const list = () => {
    return Person.find({})
}

module.exports = {
    connect: connect,
    disconnect: disconnect,
    save: save,
    remove: remove,
    list: list
}
