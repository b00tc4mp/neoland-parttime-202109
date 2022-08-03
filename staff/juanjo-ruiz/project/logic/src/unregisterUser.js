const { models: { User } } = require('data')
const { validators: { validateId, validatePassword }, errors: { NotFoundError, AuthError } } = require('commons')
const bcrypt = require('bcryptjs')

function unregisterUser(adminId, userId, password) {
    validateId(adminId, 'admin id')
    validateId(userId, 'user id')
    validatePassword(password)

    return Promise.all([User.findById(adminId), User.findById(userId)])
        .then(([admin, user]) => {
            if (!admin) throw new NotFoundError(`admin with id ${adminId} not found`)
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            if (admin.role !== 'owner')
                throw new AuthError(`user with id ${adminId} not authorized for this operation`)

            return bcrypt.compare(password, admin.password)
        })
        .then(match => {
            if (!match) throw new AuthError('wrong credentials')

            return User.deleteOne({ _id: userId })
                .then(result => {
                    const { deletedCount } = result

                    if (deletedCount === 0)
                        throw new Error(`could not delete user with id ${userId}`)
                })
        })
}

module.exports = unregisterUser