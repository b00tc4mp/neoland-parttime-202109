const { models: { Restaurant, List } } = require('data')
const { validators: { validateArray, validateId, validateNumber, validateString }, errors: { AuthError, NotFoundError } } = require('commons')

function updateList(restaurantId, listId, name, description, price) {
    validateId(restaurantId, 'restaurant id')
    validateId(listId, 'list id')
    validateString(name, 'name')
    validateString(description, 'description')
    if(price){validateNumber(price,'price')}

    return Promise.all([Restaurant.findById(restaurantId), List.findById(listId)])
        .then(([restaurant, list]) => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)
            if (!list) throw new NotFoundError(`list with id ${listId} not found`)

            if (list.restaurant.toString() !== restaurantId) throw new AuthError(`list with id ${listId} does not belong to user with id ${userId}`)
            list.name = name
            list.description = description
            list.price = price

            return list.save()
        })
        .then(list => { })
}

module.exports = updateList