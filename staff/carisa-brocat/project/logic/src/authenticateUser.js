const { models: { User } } = require('data')
const { errors: {
    AuthError,
},
    validators: {
        validateEmail,
        validatePassword
    }
} = require('commons')
const { comparePassword } = require('./helpers/crypt')

function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    return User.findOne({ email })
        .then(user => {
            if (!user)  throw new AuthError('The email or password are invalid')

            return comparePassword(password, user.password) //compara el password encriptado y el q pasa el usuario, devuelve booleano
                .then((isSamePassword) => {
                    if (!isSamePassword) 
                        throw new AuthError('Invalid Credentials')
                    
                    return user.id
                })
        })
}

module.exports = authenticateUser
