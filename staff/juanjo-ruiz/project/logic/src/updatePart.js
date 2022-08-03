const { models: { User, Vehicle, Part } } = require('data')
const { validators: { validateId, validateString }, errors: { NotFoundError, AuthError } } = require('commons')

function updatePart(adminId, vehicleId, partId, description, state) {
    validateId(adminId, 'user id')
    validateId(vehicleId, 'vehicle id')
    validateId(partId, 'part id')
    validateString(description, 'description')
    validateString(state, 'state')

    return Promise.all([User.findById(adminId), Vehicle.findById(vehicleId)])
        .then(([user, vehicle]) => {
            if (!user) throw new NotFoundError(`user with id ${adminId} not found`)
            if (!vehicle) throw new NotFoundError(`vehicle with id ${vehicleId} not found`)
            
            if ( user.role !== 'owner' && user.role !== 'admin')
                throw new AuthError(`user with id ${adminId} not authorized for this operation`)

            const { parts } = vehicle

            const part = parts.find(item => item._id.toString() === partId)

            part.description = description
            part.state = state

            return vehicle.save()
        })
}

module.exports = updatePart
