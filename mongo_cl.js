/*  Joonatan Kuosa
 *  2019-08-26
 *
 *  Helsinki Fullstack MOOC
 *  Exercises 3.12
 */
const mongo = require('./mongo')

if (process.argv.length < 3) {
    console.log('Missing arguments')
    console.log('Usage to add: node mongo.js {password} {name_to_add} {phonenumber}')
    console.log('Usage to print: node mongo.js {password}')
    process.exit(1)
}

const username = 'fido'
const password = process.argv[2]

mongo.connect(username, password)

if (process.argv.length >= 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    mongo.save(name, number).then(response => {
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

