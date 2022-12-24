function toggleSavePost(userId, postId) {
    // TODO validate input args

    return User.findById(userId)
        .then(user => {
            // TODO validate user exists

            const index = user.savePosts.findIndex(_postId => _postId.toString() === postId)

            if(index < 0) {
                user.savePosts.push(postId)
            } else {
                user.savePosts.splice(index, 1)
            }

            return user.save()
        })
        .then(() => {})
}