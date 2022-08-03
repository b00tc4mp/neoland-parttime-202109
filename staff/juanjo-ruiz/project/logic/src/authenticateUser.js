const { models: { User } } = require('data')
const bcrypt = require('bcryptjs')
const { validators: { validateEmail, validatePassword }, errors: { AuthError } } = require('commons')

function authenticateUser(email, password) {
        validateEmail(email)
        validatePassword(password)

        return User.findOne({ email })
            .then(user => {
                if (!user) throw new AuthError(`email don't exists`)

                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) throw new AuthError('wrong credentials')

                        return { userId: user.id, role: user.role }
                    })
            })
    }

module.exports = authenticateUser