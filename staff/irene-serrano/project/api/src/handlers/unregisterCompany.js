const { extractUserIdFromAuthorization } = require('./helpers')
const { unregisterCompany } = require('logic')

module.exports = (req, res) => {

 
    try {
        const companyId = extractUserIdFromAuthorization(req)
        
        const { body: { active } } = req

        unregisterCompany(companyId, active)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
} 