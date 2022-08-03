const { models: { User, Vehicle, View } } = require('data')
const { validators: { validateId, validateString }, errors: { NotFoundError } } = require('commons')

function addViewsVehicle(adminId, vehicleId, title, image) {
    validateId(adminId, 'user id')
    validateId(vehicleId, 'vehicle id')
    validateString(title, 'title')
    validateString(image, 'image')

    return Promise.all([User.findById(adminId), Vehicle.findById(vehicleId)])
        .then(([user, vehicle]) => {
            if (!user) throw new NotFoundError(`user with id ${adminId} not found`)
            if (!vehicle) throw new NotFoundError(`vehicle with id ${vehicleId} not found`)

            const view = new View({user: user.id, vehicle: vehicle.id, title, image})

            vehicle.views.push(view)

            return vehicle.save()
        })
        .then(vehicle => {})
}

module.exports = addViewsVehicle
