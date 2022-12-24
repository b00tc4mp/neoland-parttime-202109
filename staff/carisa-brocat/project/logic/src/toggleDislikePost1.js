function toggleDislikePost(userId, postId) {
    // TODO validate input args

    return User.findById(userId)
        .then(user => {
            // TODO validate user exists

            const dislikedIndex = user.dislikedPosts.findIndex(_postId => _postId.toString() === postId)

            if(dislikedIndex < 0) {
                user.dislikedPosts.push(postId)

                const likedIndex = user.likedPosts.findIndex(_postId => _postId.toString() === postId)

                if(likedIndex >= 0)
                    user.likedPosts.splice(likedIndex, 1)
            } else
                user.dislikedPosts.splice(dislikedIndex, 1)

            return user.save()
        })
        .then(() => {})
}