const { models: { User, Post } } = require('data')
const { validators: {
    validateId,
}, errors: {
    ClientError, NotFoundError, AuthError
} } = require('commons')


function toggleSavePost(userId, postId) {
    validateId(userId)
    validateId(postId)

    return Promise.all([User.findById(userId), Post.findById(postId)])
        .then(([user, post]) => {
            if (!user) {
                throw new NotFoundError(`user with id ${userId} not found`)
            }
            if (!post) {
                throw new NotFoundError('post not found')
            }

            const savedIndex = user.savedPosts.findIndex(_postId => _postId.toString() === postId)

            if (savedIndex < 0) {
                user.savedPosts.push(postId)
            } else {
                user.savedPosts.splice(savedIndex, 1)
            }

            return user.save()
        })
        .then(() => { })
}

module.exports = toggleSavePost