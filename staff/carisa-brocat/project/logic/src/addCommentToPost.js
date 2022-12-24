const { models: { User, Post, Comment } } = require('data')
const { errors: {
    NotFoundError,
}, validators: {
    validateId,
    validateString
}
} = require('commons')

function addCommentToPost(userId, postId, text) {
    validateId(userId, 'userId')
    validateId(postId, 'postId')
    validateString(text, 'text')

    return Promise.all([User.findById(userId), Post.findById(postId)])
        .then(([user, post]) => {
            if (!user) {
                throw new NotFoundError(`user with id ${userId} not found`)
            }
            if (!post) {
                throw new NotFoundError('Post not found')
            }

            const comment = new Comment({ user: userId, text })

            post.comments.push(comment)

            return post.save()
        })
        .then(post => { })
}

module.exports = addCommentToPost