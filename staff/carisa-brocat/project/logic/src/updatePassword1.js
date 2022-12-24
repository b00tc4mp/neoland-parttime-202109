const { models: { User } } = require('data')
const { errors: {
    AuthError,
    NotFoundError,
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
            return comparePassword(oldPassword, user.password) //compara el password encriptado y el q pasa el usuario, devuelve booleano
                .then((isSamePassword) => {
                    if (!isSamePassword)
                        throw new AuthError('Invalid Credentials')

                    return encryptPassword(newPassword)
                })
                .then(hash => User.updateOne({ _id: userId }, { password: hash }))
                .then(result => {
                    const usersIdFinded = result.matchedCount //el matchedCount es una propiedad del updateOne que devuelve el numero de objetos encontrados con el parametro, en este caso userId 

                    if (usersIdFinded === 0)
                        throw new NotFoundError(`user with id ${userId} not found`)
                })
        })

}

module.exports = updatePassword
