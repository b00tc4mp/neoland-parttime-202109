const { models: { Restaurant, List }} = require('data')
const { validators: { validateId }, errors: { AuthError }} = require('commons')

function deleteList(restaurantId, listId) {
    validateId(restaurantId, 'restaurant id')
    validateId(listId, 'list id')

    return Promise.all([Restaurant.findById(restaurantId), List.findById(listId)])
        .then(([restaurant, list]) => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)
            if (!list) throw new NotFoundError(`list with id ${listId} not found`)
            if (list.restaurant.toString() !== restaurantId) throw new AuthError(`list with id ${listId} does not belong to restaurant with id ${restaurantId}`)  
            
            return List.deleteOne({ _id: listId })
        })
        .then(() => {})
}

module.exports = deleteList