const { retrieveCandidate } = require('logic')
const { extractUserIdFromAuthorization } = require('./helpers')
const { errors: { AuthError, NotFoundError }} = require('commons')


module.exports = (req, res) => {
    try {
        const { params: { offerId, requestId } } = req

        retrieveCandidate(offerId, requestId)
            .then(company => res.json(company))
            .catch(error => {
                let status = 500

                if (error instanceof AuthError)
                    status = 401
                else if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}