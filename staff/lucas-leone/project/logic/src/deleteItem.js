const { models: { Restaurant, Item, List }} = require('data')
const { validators: { validateId }, errors: { AuthError, NotFoundError }} = require('commons')

function deleteItem(restaurantId, itemId) {
    validateId(restaurantId, 'restaurant id')
    validateId(itemId, 'item id')

    return Promise.all([Restaurant.findById(restaurantId), Item.findById(itemId)])
        .then(([restaurant, item]) => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)
            if (!item) throw new NotFoundError(`item with id ${itemId} not found`)
                return Item.deleteOne({ _id: itemId })
            })
            .then(() => {})
        }
       


module.exports = deleteItem