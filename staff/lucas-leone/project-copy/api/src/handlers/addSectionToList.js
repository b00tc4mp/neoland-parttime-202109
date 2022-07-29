const { extractUserIdFromAuthorization } = require('./helpers')
const { addSectionToList } = require('logic')

module.exports = (req, res) => {
    try {
        const restaurantId = extractUserIdFromAuthorization(req)

        const { params: { listId }, body: { name } } = req

        addSectionToList(restaurantId, listId, name)
            .then(sectionId => {
                res.status(200).json({ sectionId })
            })
            .catch(error => {
                let status = 500

                if (error instanceof AuthError)
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