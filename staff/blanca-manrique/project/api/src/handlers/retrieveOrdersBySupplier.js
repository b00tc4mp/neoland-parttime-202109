const { extractUserIdFromAuthorization } = require('./helpers')
const { retrieveOrdersBySupplier } = require('logic')
const { errors: { NotFoundError, FormatError } } = require('commons')

module.exports = (req, res) => {
    try {
        const userId = extractUserIdFromAuthorization(req)
        const { params: { supplierId} } = req

        retrieveOrdersBySupplier(userId, supplierId)
            .then(orders => res.status(200).json(orders))
            .catch(error => {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof TypeError || error instanceof FormatError)
            status = 400

        res.status(status).json({ error: error.message })
    }
}