const { extractUserIdFromAuthorization } = require('./helpers')
const { updateRestaurant } = require('logic')

module.exports = (req, res) => {
    try {
        const userId = extractUserIdFromAuthorization(req)

        const { body: { username, email } } = req

        updateRestaurant(userId, username, email)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}