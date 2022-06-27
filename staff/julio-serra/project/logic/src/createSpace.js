const {
    validators:
    { validateId, validateString },
    errors:
    { NotFoundError }
} = require('commons')
const { models: { User, Space } } = require('data')

function createSpace(adminId, title, description, oldPrice, price, features, type, deposit, size, time, access, image) {
    validateId(adminId, 'admin id')
    validateString(title, 'title')
    validateString(description, 'description')

    return User.findById(adminId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${adminId} not found`)

            return Space.create({ admin: adminId, title, description, oldPrice, price, features, type, deposit, size, time, access, image })
        })
        .then(space => { })
}

module.exports = createSpace