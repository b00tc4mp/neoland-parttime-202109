const { models: { User, Vehicle } } = require('data')
const { errors: { DuplicityError, NotFoundError }, validators: { validateString, validateId, validateBoolean } } = require('commons')

function createVehicle(adminId, lisense, brand, model, frame, leasingCompany, active = true) {
    validateId(adminId, 'company id')
    validateString(lisense, 'lisense')
    validateString(brand, 'brand')
    validateString(model, 'model')
    validateString(frame, 'frame')
    validateString(leasingCompany, 'leasing company')
    validateBoolean(active, 'active')

    return User.findById(adminId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${adminId} not found`)

            if (user.role !== 'owner' && user.role !== 'admin')
                throw new AuthError(`user with id ${adminId} not authorized for this operation`)

            return Vehicle.create({ company: user.company, user: user.id, lisense, brand, model, frame, leasingCompany, active })
                .then(vehicle => { return vehicle })
                .catch(error => {
                    if (error.message.includes('duplicate'))
                        throw new DuplicityError('vehicle already exist')

                    throw error
                })
        })
}

module.exports = createVehicle