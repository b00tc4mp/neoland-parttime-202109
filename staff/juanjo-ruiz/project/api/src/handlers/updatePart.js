const { extractUserIdFromAuthorization } = require('./helpersUser')
const { updatePart } = require('logic')
const { errors: { AuthError, NotFoundError, FormatError } } = require('commons')

module.exports = (req, res) => {
    try {
        const adminId = extractUserIdFromAuthorization(req)

        const { params: { vehicleId, partId }, body: { description, state } } = req

        updatePart(adminId, vehicleId, partId, description, state)
            .then(() => res.status(204).send())
            .catch(error => {
                let status = 500

                if (error instanceof AuthError)
                    status = 401
                else if (error instanceof NotFoundError)
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