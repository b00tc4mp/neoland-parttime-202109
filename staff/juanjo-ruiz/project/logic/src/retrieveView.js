const { models: { Vehicle, User } } = require('data')
const { validators: { validateId }, errors: { NotFoundError } } = require('commons')

function retrieveView(userId, vehicleId, viewId) {
    validateId(userId, 'user id')
    validateId(vehicleId, 'vehicle id')
    validateId(viewId, 'view id')

    return Promise.all([User.findById(userId), Vehicle.findById(vehicleId).lean()])
        .then(([user, vehicle]) => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)
            if (!vehicle) throw new NotFoundError(`vehicle with id ${vehicleId} not found`)

            const { views } = vehicle

            const view = views.find(item => item._id.toString() === viewId)

            view.id = view._id.toString()
            view.newDate = view.date.toLocaleDateString()

            delete view._id
            delete view.date
            
            return view
        })
}

module.exports = retrieveView