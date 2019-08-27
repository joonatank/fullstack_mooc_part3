/*  Joonatan Kuosa
 *  2019-08-26
 *
 *  Helsinki Fullstack MOOC
 *  Exercises 3.13 - 3.14
 */

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const db_name = 'test'
const params = 'retryWrites=true&w=majority'

const peopleSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    number: {type: String, required: true}
})
peopleSchema.plugin(uniqueValidator);

const Person = mongoose.model('Person', peopleSchema)

const connect = (username, password, server_url) => {
    const url = `mongodb+srv://${username}:${password}@${server_url}/${db_name}?${params}`
    mongoose.connect(url, { useNewUrlParser: true })
}

const disconnect = () => {
    mongoose.connection.close()
}

const save = (name, number) => {
    return new Person({ name: name, number: number }).save()
}

const remove = (id) => {
    const q = Person.findByIdAndDelete(id)
    return q.exec()
}

const count = () => {
    return Person.countDocuments({})
}

const list = () => {
    return Person.find({})
}

const find = (name) => {
    return Person.findOne({name: name}).exec()
}

const get = (id) => {
    return Person.findById(id)
}

module.exports = {
    connect: connect,
    disconnect: disconnect,
    save: save,
    remove: remove,
    get: get,
    find: find,
    count: count,
    list: list
}
