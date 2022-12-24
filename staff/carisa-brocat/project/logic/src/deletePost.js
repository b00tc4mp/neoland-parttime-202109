const { models: { User, Post } } = require('data')
const { errors: {
    NotFoundError,
    AuthError,
},
    validators: {
        validateId,
    }
} = require('commons')

function deletePost(userId, postId) {
    validateId(postId, 'postId')
    validateId(userId, 'userId')

    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new NotFoundError(`user with id ${userId} not found`)
            }

            return Post.deleteOne({ _id: postId })
        })
        .then(result => {
            const postDeleted = result.deletedCount

            if (postDeleted === 0)
                throw new NotFoundError('Post not found')
        })
}

module.exports = deletePost
