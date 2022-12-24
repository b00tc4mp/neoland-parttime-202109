const { models: { User, Post, Comment } } = require('data')
const { errors: {
    AuthError,
    ClientError,
    NotFoundError
},
    validators: {
        validatePassword,
        validateId,
    }
} = require('commons')
const { comparePassword } = require('./helpers/crypt')

function deleteUser(userId, password) {
    validateId(userId, 'userId')
    validatePassword(password)

    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new NotFoundError(`user with id ${userId} not found`)
            }

            return comparePassword(password, user.password)
                .then((isSamePassword) => {
                    if (!isSamePassword) {
                        throw new AuthError('Invalid Credentials')
                    }

                    return Promise.all([Post.deleteMany({ user: userId }), Comment.deleteMany({ user: userId })])
                        .then(() => {
                            User.deleteOne({ _id: userId })
                                .then(result => { })
                                .catch(error => {
                                    throw new ClientError(error.message)
                                })
                        }
                        )
                })
        })
}

module.exports = deleteUser
