const { models: { User, Post } } = require('data')
const { validators: {
    validateId,
}, errors: {
    ClientError, NotFoundError, AuthError
} } = require('commons')


function toggleLikePost(userId, postId) {
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

            const likedIndex = user.likedPosts.findIndex(_postId => _postId.toString() === postId)

            if(likedIndex < 0) {
                user.likedPosts.push(postId)

                const dislikedIndex = user.dislikedPosts.findIndex(_postId => _postId.toString() === postId)

                if(dislikedIndex >= 0){
                    user.dislikedPosts.splice(dislikedIndex, 1)
                    post.dislikes--
                }
                    
                post.likes++
            } else {
                user.likedPosts.splice(likedIndex, 1)

                post.likes--
            }

            return Promise.all([user.save(), post.save()])
        })
        .then(() => {})
}

module.exports = toggleLikePost