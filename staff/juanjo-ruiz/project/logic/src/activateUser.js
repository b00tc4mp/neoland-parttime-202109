const { models: { User } } = require('data')
const { validators: { validateId, validatePassword, validateBoolean }, errors: { NotFoundError, AuthError } } = require('commons')
const bcrypt = require('bcryptjs')

function activateUser(adminId, userId, password, active = true) {
    validateId(adminId, 'admin id')
    validateId(userId, 'user id')
    validatePassword(password)
    validateBoolean(active)

    return User.findById(adminId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${adminId} not found`)

            if (user.role !== 'owner') throw new AuthError(`user with id ${adminId} not authorized for this operation`)

            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) throw new AuthError('wrong credentials')

                    return User.updateOne({ _id: userId }, { active })
                })
                .then(result => {
                    const { matchedCount } = result

                    if (matchedCount === 0)
                        throw new NotFoundError(`user with id ${userId} not found`)
                })
        })
}

module.exports = activateUser
