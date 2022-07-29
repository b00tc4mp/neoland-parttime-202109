const { deleteList } = require('logic')
const { extractUserIdFromAuthorization } = require('./helpers')
const { errors: { AuthError, NotFoundError, FormatError } } = require('commons')

module.exports = (req, res) => {
    try {
        const restaurantId = extractUserIdFromAuthorization(req)

        const { params: { listId } } = req

        deleteList(restaurantId, listId)
            .then(() => res.status(204).send())
            .catch(error => {
                let status = 500
                if (error instanceof NotFoundError)
                    status = 404
                else if (error instanceof AuthError)
                    status = 401

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof TypeError || error instanceof FormatError)
            status = 400

        res.status(status).json({ error: error.message })
    }
}