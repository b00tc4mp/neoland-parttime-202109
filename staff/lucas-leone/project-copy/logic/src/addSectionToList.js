const { models: { Restaurant, List, Section } } = require('data')
const {
    validators: { validateId, validateString, validateArray },
    errors: { NotFoundError }
} = require('commons')
const { section } = require('data/src/schemas')
/**
 * 
 * @param {ObjectId} ListId 
 * @param {String} name 
 * @param {Array de objectId} items 
 * @returns 
 */
function addSectionToList(restaurantId, listId, name) {

    validateId(restaurantId, 'restaurant id')
    validateId(listId, 'List id')
    validateString(name, 'name')

    return Restaurant.findById(restaurantId)
        .then(restaurant => {
            if (!restaurant) throw new NotFoundError(`Restaurant with id ${restaurantId} not found`)

            return List.findById(listId)
                .then(list => {
                    if (!list) throw new NotFoundError(`list with id ${listId} not found`)
                    const section = new Section({ name })
                    
                    list.sections.push(section)
                    list.save()
                    return section._id
                })
        })
}

module.exports = addSectionToList