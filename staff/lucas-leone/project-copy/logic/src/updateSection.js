const { models: { Restaurant, List } } = require('data')


function updateSection(restaurantId, listId, sectionId, name, items) {

    return Promise.all([Restaurant.findById(restaurantId), List.findById(listId)])
        .then(([restaurant, list]) => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)
            if (!list) throw new NotFoundError(`list with id ${listId} not found`)

            if (list.restaurant.toString() !== restaurantId) throw new AuthError(`list with id ${listId} does not belong to user with id ${userId}`)

            const { sections } = list

            const section = sections.find(section => section.id == sectionId)

            section.name = name
            section.items = items


            return list.save()
        })
        .then(list => { })
}

module.exports = updateSection