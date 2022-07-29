const { extractUserIdFromAuthorization } = require('./helpers')
const { retrieveIngredients } = require('logic')
const { errors: { NotFoundError, AuthError, FormatError } } = require('commons')

module.exports = (req, res) => {
    try {
        const restaurantId = extractUserIdFromAuthorization(req)

        retrieveIngredients(restaurantId)
            .then(ingredients => res.status(200).json(ingredients))
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