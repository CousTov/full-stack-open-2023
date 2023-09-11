const mongoose = require('mongoose')

argsLen = process.argv.length

if (argsLen != 3 && argsLen !== 5){
    console.log(`
    Usage: node mongo.js <password> [name] [phonenumber]
                        
                        - [name] [phonenumber] are optional args
                        
                        Note: Both name and phonenumber are required if you want to save them to the phonebook
                              Also, If the args contain whitespaces wrap them in " "
    `)
    process.exit(1)
}

const pass = process.argv[2]
const encoded = encodeURIComponent(pass)

const url = `mongodb+srv://fullstackopen:${encoded}@phonebookdb.kpwkwxw.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const pbSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', pbSchema)

if (argsLen == 5){
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`Added ${name} : ${number} to the phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(person => {
        console.log("Phonebook: ")
        person.forEach(p => {
            console.log(p.name, p.number)
        })
        mongoose.connection.close()
    })
}