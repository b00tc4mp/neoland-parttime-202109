const { models: { User, Vehicle } } = require('data')
const { validators: { validateId, validatePassword }, errors: { NotFoundError, AuthError } } = require('commons')
const bcrypt = require('bcryptjs')

function deleteVehicle(adminId, vehicleId, password) {
    validateId(adminId, 'admin id')
    validateId(vehicleId, 'vehicle id')
    validatePassword(password)

    return Promise.all([User.findById(adminId), Vehicle.findById(vehicleId)])
        .then(([user, vehicle]) => {
            if (!user) throw new NotFoundError(`user with id ${adminId} not found`)
            if (!vehicle) throw new NotFoundError(`vehicle with id ${vehicleId} not found`)

            if (user.role !== 'owner')
            throw new AuthError(`user with id ${adminId} not authorized for this operation`)


            return bcrypt.compare(password, user.password)
        })
        .then(match => {
            if (!match) throw new AuthError('wrong credentials')

            return Vehicle.deleteOne({ _id: vehicleId })
                .then(result => {
                    const { deletedCount } = result

                    if (deletedCount === 0)
                        throw new Error(`could not delete user with id ${vehicleId}`)
                })
        })


}

module.exports = deleteVehicle