const { extractUserIdFromAuthorization } = require('./helpers')
const { updateSupplier } = require('logic')
const { errors: { NotFoundError, AuthError, FormatError, DuplicityError } } = require('commons')

module.exports = (req, res) => {
    try {
        const userId = extractUserIdFromAuthorization(req)
        const { params: { supplierId }, body: { name, email, web, phone, adress, contactPerson, tradeAssurance } } = req

        updateSupplier(userId, supplierId, name, email, web, phone, adress, contactPerson, tradeAssurance)
            .then(() => res.status(204).send())
            .catch(error => {
                let status = 500

                if (error instanceof AuthError)
                    status = 401
                
                else if (error instanceof NotFoundError)
                    status = 404
                
                else if(error instanceof DuplicityError)
                    status = 409

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof TypeError || error instanceof FormatError)
            status = 400

        res.status(status).json({ error: error.message })
    }
}