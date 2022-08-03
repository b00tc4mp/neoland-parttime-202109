const { models: { User, Company } } = require('data')
const { validators: { validateId, validateString, validateCif }, errors: { NotFoundError, AuthError } } = require('commons')

function updateCompany(adminId, companyId, businessName, cif) {
    validateId(adminId, 'user id')
    companyId(companyId, 'company id')
    validateString(businessName, 'business name')
    validateCif(cif)

    return Promise.all([User.findById(adminId), Company.findById(companyId)])
        .then(([user, company]) => {
            if (!user) throw new NotFoundError(`user with id ${adminId} not found`)
            if (!company) throw new NotFoundError(`company with id ${companyId} not found`)

            if (user.role !== 'owner')
                throw new AuthError(`user with id ${adminId} not authorized for this operation`)

            return Company.updateOne({ _id: companyId }, { businessName, cif })
                .then(result => {
                    const { matchedCount } = result

                    if (matchedCount === 0)
                        throw new NotFoundError(`company with id ${companyId} not found`)
                })
        })
}

module.exports = updateCompany
