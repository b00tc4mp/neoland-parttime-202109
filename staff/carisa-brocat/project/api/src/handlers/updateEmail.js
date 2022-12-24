const { updateEmail } = require('logic')
const extractUserIdFromToken = require('./helpers/extractUserIdFromToken')
const { errors: { FormatError, ClientError, AuthError, DuplicityError, NotFoundError } } = require('commons')

module.exports = (req, res) => {
    try {
        const userId = extractUserIdFromToken(req)

        const { body: { password, email } } = req

        updateEmail(userId, password, email)
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

        if (error instanceof TypeError || error instanceof FormatError || error instanceof ClientError)
            status = 400

        res.status(status).json({ error: error.message })
    }

}





