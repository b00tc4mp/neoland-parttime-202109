const { extractUserIdFromAuthorization } = require('./helpers')
const { retrieveItemsFromSection } = require('logic')

module.exports = (req, res) => {
    try {
        const restaurantId = extractUserIdFromAuthorization(req)
        const { body: { items } } = req

        retrieveItemsFromSection(restaurantId, items)
            .then(Items => res.status(200).json(Items))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}