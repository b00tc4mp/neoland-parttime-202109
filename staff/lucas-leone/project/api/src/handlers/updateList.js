const { extractUserIdFromAuthorization } = require('./helpers')
const { updateList } = require('logic')

module.exports = (req, res) => {
    try {
        const userId = extractUserIdFromAuthorization(req)

        const { params: { listId }, body: { name, description, price } } = req

        updateList(userId, listId, name, description, price)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}