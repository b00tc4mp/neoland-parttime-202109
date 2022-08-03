const { createVehicle } = require('logic')
const { extractUserIdFromAuthorization } = require('./helpersUser')
const { errors: { DuplicityError, FormatError } } = require('commons')

module.exports = (req, res) => {
    try {
        const adminId = extractUserIdFromAuthorization(req)

        const { body: { lisense, brand, model, frame, leasingCompany } } = req

        createVehicle(adminId, lisense, brand, model, frame, leasingCompany)
            .then(vehicle => res.status(201).json(vehicle))
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

        res.status(400).json({ error: error.message })
    }
}