const { extractUserIdFromAuthorization } = require('./helpers')
const { activateOffer } = require('logic')

module.exports = (req, res) => {
   
    try {
        const companyId = extractUserIdFromAuthorization(req)

        const { params: { offerId }} = req

        activateOffer(companyId, offerId)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}