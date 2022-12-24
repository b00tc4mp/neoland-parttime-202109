const { updateUser } = require('logic')
const extractUserIdFromToken = require('./helpers/extractUserIdFromToken')
const { errors: { NotFoundError, FormatError, ClientError, DuplicityError, AuthError, ValueError } } = require('commons')

module.exports = (req, res) => {
    try {
        const userId = extractUserIdFromToken(req)

        const { body: { nickname, image, hairTexture, interests } } = req

        updateUser(userId, nickname, image, hairTexture, interests)
            .then(() => res.status(204).send())
            .catch(error => {
                let status = 500

                if (error instanceof AuthError)
                    status = 401

                if (error instanceof NotFoundError)
                    status = 404

                if (error instanceof DuplicityError)
                    status = 409

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof AuthError)
            status = 401

        if (error instanceof TypeError || error instanceof FormatError || error instanceof ClientError || ValueError)
            status = 400

        res.status(status).json({ error: error.message })
    }

}





