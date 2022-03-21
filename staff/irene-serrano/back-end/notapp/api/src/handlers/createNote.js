const { extractUserIdFromAuthorization } = require('./helpers')
const { createNote } = require('logic')

module.exports = (req, res) => {
    try {
        const userId = extractUserIdFromAuthorization(req)

        createNote(userId, color, text, public)
        .then(() => res.status(201).send())
        .catch((error) => res.status(400).json({ error: error.message }));
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}