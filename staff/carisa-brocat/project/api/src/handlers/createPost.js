const { createPost } = require('logic')
const { errors: { FormatError, AuthError, ValueError } } = require('commons')
const extractUserIdFromToken = require('./helpers/extractUserIdFromToken')

module.exports = (req, res) => {
    try {
        const userId = extractUserIdFromToken(req)

        const { body: { title, description, category, subject, image, address } } = req

        createPost(userId, title, description, category, subject, image, address)
            .then(() => res.status(201).send())
            .catch(error => {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.message })
            })

    } catch (error) {
        let status = 500

        if (error instanceof AuthError)
            status = 401

        if (error instanceof TypeError || error instanceof FormatError || error instanceof ValueError)
            status = 400

        res.status(status).json({ error: error.message })
    }

}

