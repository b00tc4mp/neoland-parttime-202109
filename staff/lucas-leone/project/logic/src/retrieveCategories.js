const { models: { Restaurant, Category } } = require('data')
const { validators: { validateId } } = require('commons')

function retrieveCategory(restaurantId) {
    validateId(restaurantId, 'restaurant id')

    return Restaurant.findById(restaurantId)
        .then(restaurant => {
            if (!restaurant) throw new NotFoundError(`restaurant with id ${restaurantId} not found`)
            return Category.find().lean()
        })
        .then(categories => {
            categories.forEach(category =>{
                category.id = category._id.toString()
            delete category._id
            delete category.__v})

            return categories
        })

}




module.exports = retrieveCategory