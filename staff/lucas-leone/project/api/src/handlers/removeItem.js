const { removeItem } = require('logic')
const { extractUserIdFromAuthorization } = require('./helpers')

module.exports = (req, res) => {
    try {
        const restaurantId = extractUserIdFromAuthorization(req)

        const { params: { listId, sectionId , itemId } } = req

        removeItem(restaurantId, listId, sectionId, itemId)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}