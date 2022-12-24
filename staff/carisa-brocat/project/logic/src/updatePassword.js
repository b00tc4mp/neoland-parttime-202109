const { models: { User } } = require('data')
const { errors: {
    AuthError,
    NotFoundError
},
    validators: {
        validatePassword,
        validateId
    }
} = require('commons')
const { encryptPassword, comparePassword } = require('./helpers/crypt')

function updatePassword(userId, oldPassword, newPassword) {
    validateId(userId, 'userId')
    validatePassword(oldPassword)
    validatePassword(newPassword)

    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new NotFoundError(`user with id ${userId} not found`)
            }

            return comparePassword(oldPassword, user.password) //compara el password encriptado y el q pasa el usuario, devuelve booleano
                .then((isSamePassword) => {
                    if (!isSamePassword)
                        throw new AuthError('invalid credentials')

                    return encryptPassword(newPassword)
                })
                .then(hash => {
                    user.password = hash

                    return user.save()
                })
                .then(user => { })
        })

}

module.exports = updatePassword
