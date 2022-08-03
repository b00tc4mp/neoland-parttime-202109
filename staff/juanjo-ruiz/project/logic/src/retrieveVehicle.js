const { models: { Vehicle, User } } = require('data')
const { validators: { validateId }, errors: { NotFoundError, AuthError } } = require('commons')

function retrieveVehicle(adminId, vehicleId) {
    validateId(adminId, 'user id')
    validateId(vehicleId, 'vehicle id')

    return Promise.all([User.findById(adminId).lean(), Vehicle.findById(vehicleId).lean()])
        .then(([user, vehicle]) => {
            if (!user) throw new NotFoundError(`user with id ${adminId} not found`)
            if (!vehicle) throw new NotFoundError(`vehicle with id ${vehicleId} not found`)

            vehicle.id = vehicle._id.toString()
            vehicle.newDate = vehicle.date.toLocaleDateString()

            delete vehicle._id
            delete vehicle.__v
            delete vehicle.date

            const { parts } = vehicle

            parts.forEach(part => {
                part.id = part._id.toString()

                delete part._id
                delete part.__v
            })

            return vehicle
        })
}

module.exports = retrieveVehicle