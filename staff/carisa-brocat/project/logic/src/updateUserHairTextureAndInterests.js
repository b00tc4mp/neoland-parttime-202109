const { models: { User } } = require('data')
const { errors: {
    NotFoundError,
    AuthError,
},
    validators: {
        validateString,
        validateId,
        validateArray,
        validateBoolean,
    }
} = require('commons')

const { validateInterests } = require('./helpers/validateData')

function updateUserHairTextureAndInterests(userId, hairTexture, interests, quizPassed = true) {
    validateId(userId, 'userId')
    validateBoolean(quizPassed, 'quizPassed')
    validateArray(interests)
    validateInterests(interests)

    return User.updateOne({ _id: userId }, { hairTexture, interests, quizPassed })
        .then(result => {
            const usersIdFinded = result.matchedCount //el matchedCount es una propiedad del updateOne que devuelve el numero de objetos encontrados con el parametro, en este caso userId 
            if (usersIdFinded === 0)
                throw new AuthError(`user not found`)
        })
}

module.exports = updateUserHairTextureAndInterests
