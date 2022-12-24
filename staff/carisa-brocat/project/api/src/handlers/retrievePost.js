const { retrievePost} = require('logic')
const { errors: { FormatError, NotFoundError } } = require('commons')

module.exports = (req, res) => {
    try {

        const { params: { postId } } = req

        retrievePost(postId)
            .then(post => res.status(200).send(post))
            .catch(error => {
                let status = 500

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

