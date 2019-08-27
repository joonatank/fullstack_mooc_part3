/*  Joonatan Kuosa
 *  2019-08-26
 *
 *  Helsinki Fullstack MOOC
 *  Exercises 3.12
 *
 *  REQUIRES following env variables to be set (in .env file)
 *  USERNAME
 *  PASSWORD
 *  MONGODB_URL
 */
require('dotenv').config()
const process = require('process')
const mongo = require('./mongo')

if (process.argv.length >= 3 && process.argv[2] === 'help') {
    console.log('Missing arguments')
    console.log('Usage to add: node mongo.js {name_to_add} {phonenumber}')
    console.log('Usage to print: node mongo.js')
    process.exit(1)
}

mongo.connect(process.env.USERNAME, process.env.PASSWORD, process.env.MONGODB_URL)

if (process.argv.length >= 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    mongo.save(name, number).then(() => {
        console.log(`added ${name} number ${number}`)
        mongo.disconnect()
    })
}
else {
    mongo.list().then(res => {
        res.forEach(p => {
            console.log(p)
        })
        mongo.disconnect()
    })
}

