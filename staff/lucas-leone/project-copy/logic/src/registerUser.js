const { models: {Restaurant}} = require('data')
const bcrypt = require('bcryptjs')

const {
    validators: {
        validateUsername,
        validateEmail,
        validatePassword
    },
    errors: {
        DuplicityError
    }
} = require('commons')

function registerUser(username, email, password){
    validateUsername(username)
    validateEmail(email)
    validatePassword(password)

    return bcrypt.hash(password, 10)

    .then(hash => Restaurant.create({ username, email, password: hash }) )
    .then(restaurant=>{ })
    .catch(error => {
        if (error.message.includes('duplicate'))
                throw new DuplicityError('user already exists')
       
        throw error
    })
}

module.exports = registerUser