const { models: { User, Vehicle } } = require('data')
const { validators: { validateId, validatePassword, validateBoolean }, errors: { NotFoundError } } = require('commons')
const bcrypt = require('bcryptjs')

function activateVehicle(adminId, vehicleId, password, active = true) {
    validateId(adminId, 'user id')
    validateId(vehicleId, 'vehicle id')
    validatePassword(password)
    validateBoolean(active)

    return Promise.all([User.findById(adminId), Vehicle.findById(vehicleId)])
        .then(([user, vehicle]) => {
            if (!user) throw new NotFoundError(`user with id ${adminId} not found`)
            if (!vehicle) throw new NotFoundError(`vehicle with id ${vehicleId} not found`)

            if (user.role !== 'owner')
                throw new AuthError(`user with id ${adminId} not authorized for this operation`)


            return bcrypt.compare(password, company.password)
                .then(match => {
                    if (!match) throw new AuthError('wrong credentials')

                    return Vehicle.updateOne({ _id: vehicleId }, { active })
                })
                .then(result => {
                    const { matchedCount } = result

                    if (matchedCount === 0)
                        throw new NotFoundError(`vehicle with id ${vehicleId} not found`)
                })
        })
}

module.exports = activateVehicle
