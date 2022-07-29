const { models: { Restaurant, List } } = require('data')

const {
    validators: { validateId },
    errors: { NotFoundError }
} = require('commons')

function deleteSection(restaurantId, listId, sectionId) {
    validateId(restaurantId, 'restaurant id')
    validateId(listId, 'list id')
    validateId(sectionId, 'section id')

    return Promise.all([Restaurant.findById(restaurantId), List.findById(listId)])
        .then(([restaurant, list]) => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)
            if (!list) throw new NotFoundError(`list with id ${listId} not found`)

            const { sections } = list

            const sectionIndex = sections.findIndex(section => section.id === sectionId)

            if (sectionIndex < 0)
                throw new NotFoundError(`section with id ${sectionId} not found`)

            sections.splice(sectionIndex, 1)

            return list.save()
        })
        .then(() => { })
}

module.exports = deleteSection