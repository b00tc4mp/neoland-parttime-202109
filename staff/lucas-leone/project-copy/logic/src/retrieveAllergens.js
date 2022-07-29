const { models: { Restaurant, Allergen } } = require('data')
const { validators: { validateId } } = require('commons')

function retrieveCategory(restaurantId) {
    validateId(restaurantId, 'restaurant id')

    return Restaurant.findById(restaurantId)
        .then(restaurant => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)

            return Allergen.find().lean()
        })
        .then(allergens => {
            allergens.forEach(allergen => {
                allergen.id = allergen._id.toString()
                delete allergen._id
                delete allergen.__v
            })

            return allergens

        })

}




module.exports = retrieveCategory