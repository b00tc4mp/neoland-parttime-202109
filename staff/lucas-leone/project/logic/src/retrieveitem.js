const { validators: { validateId } } = require('commons')
const { models: { Restaurant, Item } } = require('data')


function retrieveItem(restaurantId, itemId) {
    validateId(restaurantId, 'restaurant id')
    validateId(itemId, 'item id')

    return Restaurant.findById(restaurantId)
        .then(restaurant => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)

            return Item.findById(itemId).populate('categories').populate('allergens').populate('ingredients')
                .then(item => {

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
                        if (ingredient._id) {
                            ingredient.id = ingredient._id.toString()

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

                    return item

                })


        })
}



module.exports = retrieveItem