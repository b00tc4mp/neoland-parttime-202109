const { models: { User } } = require('data')
const { errors: {
    NotFoundError,
    DuplicityError,
    AuthError
},
    validators: {
        validateString,
        validateId,
        validateArray,
    }
} = require('commons')

const { validateInterests } = require('./helpers/validateData')

function updateUser(userId, nickname, image, hairTexture, interests) {
    validateId(userId, 'userId')

    if (nickname)
        validateString(nickname, 'nickname')

    if (hairTexture)
        validateString(hairTexture, 'hairTexture')

    if (interests) {
        validateArray(interests)
        validateInterests(interests)
    }

    return User.updateOne({ _id: userId }, { nickname, image, hairTexture, interests})
        .then(result => {
            const usersIdFinded = result.matchedCount //el matchedCount es una propiedad del updateOne que devuelve el numero de objetos encontrados con el parametro, en este caso userId 

            if (usersIdFinded === 0)
                throw new AuthError(`user not found`)
        })
        .catch(error => {
            if (error.message.includes('duplicate') & error.message.includes('nickname'))
                throw new DuplicityError('duplicate nickname')
        })
}

module.exports = updateUser
