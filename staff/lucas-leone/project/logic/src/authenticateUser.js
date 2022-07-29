

const { models: { Restaurant } } = require('data')
const { 
    validators: { 
        validateUsername, 
        validatePassword 
    },
    errors: {
        AuthError
    }
} = require('commons')
const bcrypt = require('bcryptjs')

function authenticateUser(username, password) {
    validateUsername(username)
    validatePassword(password)

    return Restaurant.findOne({ username })
        .then(restaurant => {
            if (!restaurant) throw new AuthError('wrong credentials')
            return bcrypt.compare(password, restaurant.password)
                .then(match => {
                    if (!match) throw new AuthError('wrong credentials')

                    return restaurant.id
                })
        })
}

module.exports = authenticateUser