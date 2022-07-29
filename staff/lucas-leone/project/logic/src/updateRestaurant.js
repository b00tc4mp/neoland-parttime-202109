const { models: { Restaurant }} = require('data')

function updateRestaurant(restaurantId, username, email) {
    return Restaurant.updateOne({ _id: restaurantId }, { username, email})
        .then(result => {
            const { matchedCount } = result

            if (matchedCount === 0)
                throw new Error(`user with id ${userId} not found`)
        })
}

module.exports = updateRestaurant