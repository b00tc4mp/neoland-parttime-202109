const { models: { Restaurant, Item } } = require('data')
const { validators: { validateArray, validateId, validateNumber, validateString }, errors: { AuthError, NotFoundError } } = require('commons')


function updateitem(restaurantId, itemId, name, categories, ingredients, allergens, price, image) {
    validateId(restaurantId, 'restaurant id')
    validateId(itemId, 'item id')
    validateString(name, 'name')
    if (categories) { validateArray(categories, 'categories') }
    if (ingredients) { validateArray(ingredients, 'ingredients') }
    if (allergens) { validateArray(allergens, 'allergens') }
    if (price) { validateNumber(price, 'price') }
    if (image) { validateString(image, 'image') }

    return Promise.all([Restaurant.findById(restaurantId), Item.findById(itemId)])
        .then(([restaurant, item]) => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)
            if (!item) throw new NotFoundError(`item with id ${itemId} not found`)

            if (item.restaurant.toString() !== restaurantId) throw new AuthError(`item with id ${itemId} does not belong to user with id ${userId}`)

            item.name = name
            item.categories = categories
            item.ingredients = ingredients
            item.allergens = allergens
            item.price = price
            item.image = image

            return item.save()
        })
        .then(item => { })
}

module.exports = updateitem