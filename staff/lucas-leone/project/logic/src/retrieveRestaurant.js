const { models: { Restaurant, List } } = require('data')

const {
    validators: { validateId },
    errors: { NotFoundError }
} = require('commons')

function retrieveRestaurant(restaurantId) {
    validateId(restaurantId, 'restaurant id')

    return Restaurant.findById(restaurantId)
        .then(restaurant => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)
            restaurant.id = restaurant._id.toString()

            delete restaurant._id
            delete restaurant.__v

            return restaurant

        })       
        }
        module.exports = retrieveRestaurant
