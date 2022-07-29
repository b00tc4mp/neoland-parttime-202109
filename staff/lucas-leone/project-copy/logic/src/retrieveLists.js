const { models: { Restaurant, List } } = require('data')
const {
    validators: { validateId },
    errors: { NotFoundError }
} = require('commons')

function retrieveLists(restaurantId) {
    validateId(restaurantId, 'restaurant id')

    return Restaurant.findById(restaurantId)
        .then(restaurant => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)

            return List.find({ restaurant: restaurantId }).lean()
        })
        .then(lists => {
            lists.forEach(list => {
                list.id = list._id.toString()

                delete list._id
                delete list.__v

            })

            return lists
        })

}

module.exports = retrieveLists