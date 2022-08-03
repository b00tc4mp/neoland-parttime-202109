const { models: { User } } = require('data')
const { validators: { validateId, validateString, validateEmail }, errors: { NotFoundError, AuthError } } = require('commons')

function updateUser(adminId, userId, name, email, role) {
    validateId(adminId, 'admin id')
    validateId(userId, 'user id')
    validateString(name, 'name')
    validateEmail(email)
    validateString(role, 'role')

    return Promise.all([User.findById(adminId), User.findById(userId)])
        .then(([admin, user]) => {
            if (!admin) throw new NotFoundError(`user with id ${adminId} not found`)
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            if (admin.role !== 'owner' && admin.role !== 'admin')
                throw new AuthError(`user with id ${adminId} not authorized for this operation`)

            if (role === 'owner' || role === 'admin' && admin.role !== 'owner')
                throw new AuthError(`user with id ${adminId} not authorized for this operation`)

            return User.updateOne({ _id: userId }, { name, email, role })
                .then(result => {
                    const { matchedCount } = result

                    if (matchedCount === 0)
                        throw new NotFoundError(`user with id ${userId} not found`)
                })
        })
}

module.exports = updateUser
