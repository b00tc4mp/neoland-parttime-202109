const { models: { Vehicle, User } } = require('data')
const { validators: { validateId, validateString }, errors: { NotFoundError } } = require('commons')

function findVehicles(userId, query) {
    validateId(userId, 'user id')
    validateString(query, 'query')

    const keywords = query.split(' ')

    const matching = []

    keywords.map(keyword => {
        const re = new RegExp(keyword)

        matching.push({ lisense: re })
    })

    const criteria = { $or: matching }

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            return Vehicle.find(criteria).lean().sort('-date')
        })
        .then(vehicles => {
            vehicles.forEach(vehicle => {

                vehicle.id = vehicle._id.toString()

                delete vehicle._id
                delete vehicle.__v

                const { parts } = vehicle

                parts.forEach(part => {
                    part.id = part._id.toString()

                    delete part._id
                    delete part.__v
                })
            })

            return vehicles
        })
}

module.exports = findVehicles