const { models: { User } } = require('data')
const { validators: { validateId, validateBoolean, validatePassword }, errors: { NotFoundError, AuthError } } = require('commons')
const bcrypt = require('bcryptjs')

function disableUser(adminId, userId, password, active = false) {
    validateId(adminId, 'company id')
    validateId(userId, 'user id')
    validatePassword(password)
    validateBoolean(active)

    return Promise.all([User.findById(adminId), User.findById(userId)])
        .then(([admin, user]) => {
            if (!admin) throw new NotFoundError(`admin with id ${adminId} not found`)
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            if (admin.role !== 'owner')
                throw new AuthError(`admin with id ${adminId} not authorized for this operation`)

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

module.exports = disableUser
