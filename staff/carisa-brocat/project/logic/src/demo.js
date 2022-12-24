const { mongoose: { connect, disconnect } } = require('data')
const { registerUser } = require('.')


connect('mongodb://localhost:27017/project')
    .then(() => console.log('connected to db'))
    .then(() => {
        try {
            return registerUser('Maria', 'maria@gmail.com', '12345678')
                .then(() => console.log('user registered'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })

    .then(() => disconnect())
    .then(() => console.log('disconnected from db'))

