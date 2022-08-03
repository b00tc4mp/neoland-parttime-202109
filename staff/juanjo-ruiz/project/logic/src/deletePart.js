const { models: { User, Vehicle } } = require('data')
const { validators: { validateId, validatePassword }, errors: { NotFoundError, AuthError } } = require('commons')
const bcrypt = require('bcryptjs')

function deletePart(adminId, vehicleId, partId, password) {
    validateId(adminId, 'user id')
    validateId(vehicleId, 'vehicle id')
    validateId(partId, 'part id')
    validatePassword(password)

    return Promise.all([User.findById(adminId), Vehicle.findById(vehicleId)])
        .then(([user, vehicle]) => {
            if (!user) throw new NotFoundError(`user with id ${adminId} not found`)
            if (!vehicle) throw new NotFoundError(`vehicle with id ${vehicleId} not found`)

            if ( user.role !== 'owner')
                throw new AuthError(`user with id ${adminId} not authorized for this operation`)

            return bcrypt.compare(password, user.password)

                .then(match => {
                    if (!match) throw new AuthError('wrong credentials')

                    const { parts } = vehicle

                    const partIndex = parts.findIndex(part => part.id === partId)

                    if (partIndex < 0) throw new NotFoundError(`part with id ${partId} not found`)

                    parts.splice(partIndex, 1)

                    return vehicle.save()
                })
                .then(() => { })
        })
}

module.exports = deletePart