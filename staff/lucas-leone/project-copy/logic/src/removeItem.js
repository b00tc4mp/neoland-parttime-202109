const { models: { Restaurant, List } } = require('data')

const {
    validators: { validateId},
    errors: { NotFoundError }
} = require('commons')

function removeItem(restaurantId, listId, sectionId, itemId) {
    validateId(restaurantId, 'restaurant id')
    validateId(listId, 'list id')
    validateId(sectionId, 'section id')
    validateId(itemId, 'item id')

    return Promise.all([Restaurant.findById(restaurantId), List.findById(listId)])
        .then(([restaurant, list]) => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)
            if (!list) throw new NotFoundError(`list with id ${listId} not found`)

            const { sections } = list
            const section = sections.find(section => section.id === sectionId)
            const { items } = section
            const itemIndex = items.findIndex(item => item.toString() === itemId)

            if (itemIndex < 0) { throw new NotFoundError(`item with id ${itemId} not found`)}

            items.splice(itemIndex, 1)

            return list.save()
        })
        .then(() => { })
}

module.exports = removeItem