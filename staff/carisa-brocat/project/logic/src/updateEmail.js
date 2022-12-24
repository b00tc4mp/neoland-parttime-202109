const { models: { User } } = require('data')
const { errors: {
    AuthError,
    DuplicityError,
    NotFoundError
},
    validators: {
        validatePassword,
        validateId,
        validateEmail,
    }
} = require('commons')
const { comparePassword } = require('./helpers/crypt')

function updateEmail(userId, password, email) {
    validateId(userId, 'userId')
    validatePassword(password)
    validateEmail(email)

    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new NotFoundError(`user with id ${userId} not found`)
            }

            return comparePassword(password, user.password) //compara el password encriptado y el q pasa el usuario, devuelve booleano
                .then((isSamePassword) => {
                    if (!isSamePassword)
                        throw new AuthError('invalid credentials')

                    user.email = email

                    return user.save()
                })
                .then(user => { })
                .catch(error => {
                    if (error.message.includes('duplicate') & error.message.includes('email'))
                        throw new DuplicityError('duplicate email')
                })


        })


}

module.exports = updateEmail
