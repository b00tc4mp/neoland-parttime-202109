const { extractUserIdFromAuthorization } = require('./helpers')
const { updateSection } = require('logic')

module.exports = (req, res) => {
    try {
        const userId = extractUserIdFromAuthorization(req)

        const { params: { listId, sectionId }, body: { name, items } } = req

        updateSection(userId, listId, sectionId, name, items)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}