const { updatePassword } = require('logic')
const extractUserIdFromToken = require('./helpers/extractUserIdFromToken')
const { errors: { NotFoundError, FormatError, ClientError, AuthError } } = require('commons')

module.exports = (req, res) => {
    try {
        const userId = extractUserIdFromToken(req)

        const { body: { oldPassword, newPassword } } = req

        updatePassword(userId, oldPassword, newPassword)
            .then(() => res.status(204).send())
            .catch(error => {
                let status = 500

                if (error instanceof AuthError)
                    status = 401

                if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof AuthError)
                    status = 401

        if (error instanceof TypeError || error instanceof FormatError || error instanceof ClientError)
            status = 400

        res.status(status).json({ error: error.message })
    }

}





