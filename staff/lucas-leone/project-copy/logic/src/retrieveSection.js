const { models: { Restaurant, List } } = require('data')

const {
    validators: { validateId },
    errors: { NotFoundError }
} = require('commons')

function retrieveSection(restaurantId, listId, sectionId) {
    validateId(restaurantId, 'restaurant id')
    validateId(listId, 'list id')

    return Restaurant.findById(restaurantId)
        .then(restaurant => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)

            return List.findById(listId).lean()
        })
        .then(list => {

            const { sections } = list

            const section = sections.find(section => section._id.toString() === sectionId)
        
            section.id = section._id.toString()

            delete section._id
            delete section.__v


            return section

        })
}

module.exports = retrieveSection