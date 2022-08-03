const { models: { Vehicle, User } } = require('data')
const { validators: { validateId }, errors: { NotFoundError } } = require('commons')

function retrieveAllParts(userId, vehicleId) {
    validateId(userId, 'user id')
    validateId(vehicleId, 'vehicle id')

    return Promise.all([User.findById(userId), Vehicle.findById(vehicleId).lean()])
        .then(([user, vehicle]) => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)
            if (!vehicle) throw new NotFoundError(`vehicle with id ${vehicleId} not found`)

            const { parts } = vehicle

            parts.forEach(part => {

                part.id = part._id.toString()
                part.newDate = part.date.toLocaleDateString()
    
                delete part._id
                delete part.date
                
            })
            return parts

        })
}

module.exports = retrieveAllParts