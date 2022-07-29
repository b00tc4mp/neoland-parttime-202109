const { models: { Restaurant, List } } = require('data')

const {
    validators: { validateId },
    errors: { NotFoundError }
} = require('commons')

function retrieveList(restaurantId, listId) {
    validateId(restaurantId, 'restaurant id')
    validateId(listId, 'list id')

    return Restaurant.findById(restaurantId)
        .then(restaurant => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)
            return List.findById(listId).lean()
        })
        .then(list => {

            list.id = list._id.toString()

            delete list._id
            delete list.__v

            const {sections} = list
            sections.forEach(section => {

                section.id = section._id.toString()

                delete section._id
                delete section.__v
            })

            return list
        })

}




module.exports = retrieveList