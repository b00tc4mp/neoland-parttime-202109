const { models: { User } } = require('data')
const { errors: {
    DuplicityError,
    ClientError
},
    validators: {
        validateString,
        validateEmail,
        validatePassword
    }
} = require('commons')
const { encryptPassword } = require('./helpers/crypt')

function registerUser(nickname, email, password) {
    validateString(nickname, 'nickname')
    validateEmail(email)
    validatePassword(password)

    return encryptPassword(password)
        .then(hash => User.create({ nickname, email, password: hash }))
        .then(user => { })
        .catch(error => {
            if (error.message.includes('duplicate') & error.message.includes('email'))
                throw new DuplicityError('duplicate email')

            if (error.message.includes('duplicate') & error.message.includes('nickname'))
                throw new DuplicityError('duplicate nickname')

            throw new ClientError(error.message)
        })
}

module.exports = registerUser