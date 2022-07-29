const { extractUserIdFromAuthorization } = require('./helpers')
const { updateItem } = require('logic')

module.exports = (req, res) => {
    try {
        const userId = extractUserIdFromAuthorization(req)

        const { params: { itemId }, body: { name, categories, ingredients, allergens, price, image } } = req

        updateItem(userId, itemId, name, categories, ingredients, allergens, price, image)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}