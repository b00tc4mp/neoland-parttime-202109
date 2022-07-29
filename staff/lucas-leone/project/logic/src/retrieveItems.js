const { models: { Restaurant, Item } } = require('data')
const {
    validators: { validateId },
    errors: { NotFoundError }
} = require('commons')

function retrieveItems(restaurantId) {
    validateId(restaurantId, 'restaurant id')

    return Restaurant.findById(restaurantId)
        .then(restaurant => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)

            return Item.find({ restaurant: restaurantId }).lean()
        })
        .then(items => {

            items.forEach(item => {
                item.id = item._id.toString()

                delete item._id
                delete item.__v

            })

            return items

        })

}

module.exports = retrieveItems