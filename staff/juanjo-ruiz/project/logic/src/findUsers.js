const { models: { User } } = require('data')
const { validators: { validateId, validateString }, errors: { NotFoundError } } = require('commons')

function findUsers(userId, query) {
    validateId(userId, 'user id')
    validateString(query, 'query')

    const keywords = query.split(' ')

    const matching = []

    keywords.map(keyword => {
        const re = new RegExp(keyword)

        matching.push({ name: re })
    })

    const criteria = { $or: matching }

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            return User.find(criteria).lean().sort('-date')
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

module.exports = findUsers