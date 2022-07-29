const { models: { Restaurant } } = require('data')
const bcrypt = require('bcryptjs')

const {
    validators: {
        validatePassword,
        validateId
    },
    errors: {
        NotFoundError,
        AuthError
    }
} = require('commons')

function unregisterRestaurant(restaurantId, password) {
    validateId(restaurantId, 'restaurant id')
    validatePassword(password)

    return Restaurant.findById(restaurantId)
        .then(restaurant => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)

            return bcrypt.compare(password, restaurant.password)
        })
        .then(match => {

            if (!match) throw new AuthError('wrong credentials')

            return Restaurant.deleteOne({ _id: restaurantId })
        })
        .then(result => {
            const { deletedCount } = result

            if (deletedCount === 0)
                throw new Error(`could not delete resturant with id ${restaurantId}`)
        })
}

module.exports = unregisterRestaurant