const { models: { User, Post } } = require('data')
const { errors: {
    NotFoundError,
    ConditionError
}, validators: {
    validateId,
    validateString,
}
} = require('commons')
const {validateCategory, validateSubject} = require('./helpers/validateData')

function retrievePostsBy(userId, category, subject) {
    validateId(userId, 'userId')

    if (category) {
        validateString(category, 'category')
        validateCategory(category)
    }

    if (subject) {
        validateString(subject, 'subject')
        validateSubject(subject)
    }

    if (!category && !subject)
        throw new ConditionError('category and subject are both not provided')

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            if (category && subject)
                return Post.find({ category, subject }).lean().populate('user').sort('-date')
            else if (category)
                return Post.find({ category }).lean().populate('user').sort('-date')
            else if (subject)
                return Post.find({ subject }).lean().populate('user').sort('-date')
        })
        .then(posts => {
            if (posts.length)
                posts.forEach(post => {
                    post.id = post._id.toString()
                    delete post._id

                    post.userId = post.user._id.toString()
                    post.userName = post.user.name
                    delete post.user

                    delete post.__v

                    const { comments } = post

                    if (comments) {
                        comments.forEach(comment => {
                            comment.id = comment._id.toString()
                            delete comment._id

                            comment.userId = comment.user._id
                            comment.userName = comment.user.name
                            delete comment.user

                            delete comment.__v
                        })
                    }
                })

            return posts
        })
}

module.exports = retrievePostsBy