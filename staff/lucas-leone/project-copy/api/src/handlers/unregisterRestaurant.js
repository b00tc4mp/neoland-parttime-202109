const { extractUserIdFromAuthorization } = require('./helpers')
const { unregisterRestaurant } = require('logic')

module.exports = (req, res) => {
    try {
        const restaurantId = extractUserIdFromAuthorization(req)

        const { body: { password } } = req

        unregisterRestaurant(restaurantId, password)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}