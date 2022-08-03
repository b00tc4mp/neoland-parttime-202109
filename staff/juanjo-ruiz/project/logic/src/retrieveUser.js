const { models: { User } } = require('data')
const { validators: { validateId }, errors: { NotFoundError } } = require('commons')

function retrieveUser(adminId, userId) {
    validateId(adminId, 'admin id')
    validateId(userId, 'user id')

    return Promise.all([User.findById(adminId).lean(), User.findById(userId).lean()])
        .then(([admin, user]) => {
            if (!admin) throw new NotFoundError(`admin with id ${adminId} not found`)    
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            if (admin.role !== 'owner' && admin.role !== 'admin')
            throw new AuthError(`admin with id ${adminId} not authorized for this operation`)

            user.id = user._id.toString()
            user.newDate = user.date.toLocaleDateString()
            user.newDischargeDate = user.date.toLocaleDateString()

            delete user._id
            delete user.__v
            delete user.password
            delete user.date

            return user
        })
}

module.exports = retrieveUser