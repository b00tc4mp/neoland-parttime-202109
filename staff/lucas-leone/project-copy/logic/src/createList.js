const { models: { Restaurant, List } } = require('data')
const { 
    validators: { validateId, validateString },
    errors: { NotFoundError }
} = require('commons')

function createList(restaurantId, name, description) {
    validateId(restaurantId, 'restaurant id')
    validateString(name, 'name')
    if(description){validateString(description, 'description')}

    return Restaurant.findById(restaurantId)
        .then(restaurant => {
            if (!restaurant) throw new NotFoundError(`Restaurant with id ${restaurantId} not found`)

            return List.create({ restaurant: restaurantId, name, description })
        })
        .then(list => { })
}

module.exports = createList