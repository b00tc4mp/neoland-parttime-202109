const { models: { User } } = require('data')
const { validators: { validateId }, errors: { NotFoundError, AuthError } } = require('commons')

function retrieveAllUsers(userId) {
    validateId(userId, 'user id')

    return User.findById(userId)
        .then(user => {
            if (!userId) throw new NotFoundError(`userId with id ${userId} not found`)

            if (user.role !== 'owner' && user.role !== 'admin')
                throw new AuthError(`userId with id ${userId} not authorized for this operation`)

            return User.find({ company: user.company }).lean().sort('-date')
        })
        .then(users => {
            users.forEach(user => {

                user.id = user._id.toString()

                delete user._id
                delete user.__v
            })
            return users
        })
}

module.exports = retrieveAllUsers