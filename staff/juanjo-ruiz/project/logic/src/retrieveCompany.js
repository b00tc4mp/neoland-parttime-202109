const { models: { Company, User } } = require('data')
const { validators: { validateId }, errors: { NotFoundError } } = require('commons')

function retrieveCompany(userId, companyId) {
    validateId(userId, 'user id')
    validateId(companyId, 'company id')

    return Promise.all([User.findById(userId), Company.findById(companyId)])
        .then(([user, company]) => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)
            if (!company) throw new NotFoundError(`company with id ${companyId} not found`)

            if (user.role !== 'owner' && user.role !== 'admin')
            throw new AuthError(`user with id ${userId} not authorized for this operation`)
            
            company.id = company._id.toString()
            
            delete company._id
            delete company.__v  

            return company
        })
}

module.exports = retrieveCompany