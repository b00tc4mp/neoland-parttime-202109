const { models: { User, Vehicle } } = require('data')
const { validators: { validateId, validateString }, errors: { NotFoundError, AuthError } } = require('commons')

function updateVehicle(adminId, vehicleId, lisense, brand, model, frame) {
    validateId(adminId, 'user id')
    validateId(vehicleId, 'vehicle id')
    validateString(lisense, 'lisense')
    validateString(brand, 'brand')
    validateString(model, 'model')
    validateString(frame, 'frame')

    return Promise.all([User.findById(adminId), Vehicle.findById(vehicleId)])
        .then(([user, vehicle]) => {
            if (!user) throw new NotFoundError(`user with id ${adminId} not found`)
            if (!vehicle) throw new NotFoundError(`vehicle with id ${vehicleId} not found`)

            if (user.role !== 'owner' && user.role !== 'admin')
                throw new AuthError(`user with id ${adminId} not authorized for this operation`)

            return Vehicle.updateOne({ _id: vehicleId }, { lisense, brand, model, frame})
                .then(result => {
                    const { matchedCount } = result

                    if (matchedCount === 0)
                        throw new NotFoundError(`vehicle with id ${vehicleId} not found`)
                })
        })
}

module.exports = updateVehicle
