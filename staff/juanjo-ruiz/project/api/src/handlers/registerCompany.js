const { registerCompany } = require('logic')
const { errors: { DuplicityError, FormatError } } = require('commons')

module.exports = (req, res) => {
    try {
        const { body: { businessName, cif, name, email, password } } = req

        registerCompany(businessName, cif, name, email, password)
            .then(() => res.status(201).send())
            .catch(error => {
                let status = 500

                if (error instanceof DuplicityError)
                    status = 409

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof TypeError || error instanceof FormatError)
            status = 400

        res.status(status).json({ error: error.message })
    }
}