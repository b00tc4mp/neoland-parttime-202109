const { models: { User, Company } } = require('data')
const { validators: { validateId, validatePassword }, errors: { NotFoundError, AuthError } } = require('commons')
const bcrypt = require('bcryptjs')

function unregisterCompany(adminId, companyId, password) {
    validateId(adminId, 'user id')
    validateId(companyId, 'company id')
    validatePassword(password)

    return Promise.all([User.findById(adminId), Company.findOne(companyId)])
        .then(([user, company]) => {
            if (!user) throw new NotFoundError(`user with id ${adminId} not found`)
            if (!company) throw new NotFoundError(`company with id ${companyId} not found`)

            if (user.role !== 'owner')
                throw new AuthError(`user with id ${userId} not authorized for this operation`)

            return bcrypt.compare(password, user.password)
        })
        .then(match => {
            if (!match) throw new AuthError('wrong credentials')

            return Company.deleteOne({ _id: companyId })
                .then(result => {
                    const { deletedCount } = result

                    if (deletedCount === 0)
                        throw new Error(`could not delete company with id ${companyId}`)
                })
        })
}

module.exports = unregisterCompany