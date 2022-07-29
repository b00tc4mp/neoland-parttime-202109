const { extractUserIdFromAuthorization } = require('./helpers')
const { createItem } = require('logic')
const { errors: { NotFoundError, FormatError } } = require('commons')

module.exports = (req, res) => {
    try {
        const restaurantId = extractUserIdFromAuthorization(req)

        const { params: { listId, sectionId }, body: { name, categories, ingredients, allergens, price } } = req

        createItem(restaurantId, listId, sectionId, name, categories, ingredients, allergens, price)
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