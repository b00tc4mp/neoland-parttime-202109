const { models: { User, Vehicle, Part, Coordinate } } = require('data')
const { errors: { NotFoundError }, validators: { validateString, validateId, validateNumber, validateObject } } = require('commons')

function createPart(userId, vehicleId, side, description, image, coordinates) {
    validateId(userId, 'user id')
    validateId(vehicleId, 'vehicle id')
    validateString(side, 'side')
    validateString(description, 'description')
    validateString(image, 'image')
    validateObject(coordinates, 'coordinates')
    validateNumber(coordinates.x, 'x')
    validateNumber(coordinates.y, 'y')

    return Promise.all([User.findById(userId), Vehicle.findById(vehicleId)])
        .then(([user, vehicle]) => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)
            if (!vehicle) throw new NotFoundError(`vehicle with id ${vehicleId} not found`)

            const _coordinates = new Coordinate(coordinates)

            const part = new Part({ company: user.company, user: user.id, vehicle: vehicle.id, side, description, image, coordinates: _coordinates })

            vehicle.parts.push(part)

            return vehicle.save()
        })
        .then(vehicle => { })
}

module.exports = createPart