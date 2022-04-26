//conecto a la base de datos


const { connect, disconnect } = require('mongoose')  //conecto con mongo base d datos
const User = require('./User')

connect('mongodb://localhost:27017/demo-db')
    .then(() => console.log('connected'))
    // .then(() => User.findOne({ name: 'Mickey Mouse'}))
    // .then(user => console.log(user))
    // .then(() => User.find({ name: /Mickey/ }))
    // .then(users => console.log(users))


    .then(() => {
        const user = new User({ name: 'John Doe', email: 'john@doe.com', password: '123123123' })

        return user.save()
            .then(() => {
                console.log('john saved')
})
    })
    .then(() => disconnect())