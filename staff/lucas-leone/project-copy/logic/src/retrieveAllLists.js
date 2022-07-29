const { models: { Restaurant, List } } = require('data')
const {
    validators: { validateId },
    errors: { NotFoundError }
} = require('commons')
const { validateString } = require('commons/src/validators')

function retrieveLists(username) {
    validateString(username, 'username')

    return Restaurant.find({username})
        .then(restaurant => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)

            return List.find({ username }).lean()
        })
        .then(lists => {
            lists.forEach(list => {
                list.id = list._id.toString()

                delete list._id
                delete list.__v

            })

            return lists
        })

}

module.exports = retrieveLists