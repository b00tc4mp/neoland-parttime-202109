function toggleLikePost(userId, postId) {
    // TODO validate input args

    return Promise.all([User.findById(userId), Post.findById(postId)])
        .then(([user, post]) => {
            // TODO validate user exists
            // TODO validate post exists

            const likedIndex = user.likedPosts.findIndex(_postId => _postId.toString() === postId)

            if(likedIndex < 0) {
                user.likedPosts.push(postId)

                const dislikedIndex = user.dislikedPosts.findIndex(_postId => _postId.toString() === postId)

                if(dislikedIndex >= 0)
                    user.dislikedPosts.splice(dislikedIndex, 1)

                post.likes++
            } else {
                user.likedPosts.splice(likedIndex, 1)

                post.likes--
            }

            return Promise.all([user.save(), post.save()])
        })
        .then(() => {})
}