const { models: { Restaurant, Item, List } } = require('data')

const {
    validators: { validateId, validateString, validateArray, validateNumber },
    errors: { NotFoundError }
} = require('commons')

function createItem(restaurantId, listId, sectionId, name, categories, ingredients, allergens, price) {
    validateId(restaurantId, 'restaurant id')
    validateId(sectionId, 'section id')
    validateId(listId, 'section id')
    validateString(name, 'name')
    validateArray(categories, 'categories')
    validateArray(ingredients, 'ingredients')
    validateArray(allergens, 'allergens')
    validateNumber(price, 'price')

    return Promise.all([Restaurant.findById(restaurantId), List.findById(listId), Item.create({ restaurant: restaurantId, name, categories, ingredients, allergens, price })])
        .then(([restaurant, list, item]) => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)
            if (!list) throw new NotFoundError(`list with id ${listId} not found`)
            
            item.id = item._id.toString()
            delete item._id
            delete item.__v

            const { sections } = list
            const section = sections.find(section => section.id === sectionId)

            section.items.push(item.id)
            return list.save()

                .then(item => {})
        })
    }

module.exports = createItem