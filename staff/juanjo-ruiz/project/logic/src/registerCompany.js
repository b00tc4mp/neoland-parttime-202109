const { models: { Company, User } } = require('data')
const bcrypt = require('bcryptjs')
const { errors: { DuplicityError }, validators: { validateString, validateEmail, validatePassword, validateCif } } = require('commons')


function registerCompany(businessName, cif, name, email, password) {
    validateString(businessName, 'business name')
    validateCif(cif)
    validateString(name, 'name')
    validateEmail(email)
    validatePassword(password)

    return bcrypt.hash(password, 10)
        .then(hash => {
            const company = new Company({ businessName, cif })

            const user = new User({ company: company.id, user: company.id, name, email, password: hash, role: 'owner' })

            return Promise.all([company.save(), user.save()])
        })
        .then(([company, user]) => { })
        .catch(error => {
            if (error.message.includes('duplicate'))
                throw new DuplicityError('company already exist')

            throw error
        })
}

module.exports = registerCompany