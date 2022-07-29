const { extractUserIdFromAuthorization } = require('./helpers')
const { createList } = require('logic')
const { errors: { NotFoundError, FormatError } } = require('commons')

module.exports = (req, res) => {
    try {
        const restaurantId = extractUserIdFromAuthorization(req)

        const { body: { name, description } } = req

        createList(restaurantId, name, description)
            .then(() => res.status(201).send())
            .catch(error => {
                let status = 50
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