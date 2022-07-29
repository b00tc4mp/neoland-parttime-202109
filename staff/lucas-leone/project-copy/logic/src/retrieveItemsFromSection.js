const { models: { Restaurant, Item } } = require('data')
const {
    validators: { validateId, validateArray },
    errors: { NotFoundError }
} = require('commons')

function retrieveItemsFromList(restaurantId, items) {
    validateId(restaurantId, 'restaurant id')
    validateArray(items, 'items')

    return Restaurant.findById(restaurantId)
        .then(restaurant => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)

            return Item.find({
                '_id': { $in: items }

            }).lean().populate('categories').populate('allergens').populate('ingredients')
        })
        .then(items => {

            items.forEach(item => {
                item.id = item._id.toString()

                delete item._id
                delete item.__v

                const { categories } = item
                categories.forEach(category => {
                    if (category._id) {
                        category.id = category._id.toString()

                        delete category._id
                        delete category.__v
                    }
                })

                const { ingredients } = item
                ingredients.forEach(ingredient => {

                    ingredient.id = ingredient._id.toString()
                    if (ingredient._id) {
                        delete ingredient._id
                        delete ingredient.__v
                    }
                })

                const { allergens } = item
                allergens.forEach(allergen => {
                    if (allergen._id) {
                        allergen.id = allergen._id.toString()

                        delete allergen._id
                        delete allergen.__v
                    }
                })
            })

            return items
        })
}

module.exports = retrieveItemsFromList 