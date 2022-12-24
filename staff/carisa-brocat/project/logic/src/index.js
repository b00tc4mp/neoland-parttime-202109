const registerUser = require('./registerUser')
const authenticateUser = require('./authenticateUser')
const retrieveUser = require('./retrieveUser')
const updateUser = require('./updateUser')
const updatePassword = require('./updatePassword')
const updateEmail = require('./updateEmail')
const deleteUser = require('./deleteUser')
const createPost = require('./createPost')
const deletePost = require('./deletePost')
const retrieveUserPosts = require('./retrieveUserPosts')
const retrieveUserPostsBy = require('./retrieveUserPostsBy')
const retrieveAllPosts = require('./retrieveAllPosts')
const retrievePost = require('./retrievePost')
const addCommentToPost = require('./addCommentToPost')
const retrievePostsBy = require('./retrievePostsBy')
const updateUserHairTextureAndInterests = require('./updateUserHairTextureAndInterests')
const toggleSavePost = require('./toggleSavePost')
const toggleLikePost = require('./toggleLikePost')
const toggleDislikePost = require('./toggleDislikePost')
const retrieveUserSavedPosts  = require('./retrieveUserSavedPosts')
const retrieveUserSavedPostsBy  = require('./retrieveUserSavedPostsBy')

module.exports = {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    deleteUser,
    updatePassword,
    updateEmail,
    createPost,
    deletePost,
    retrieveUserPosts,
    retrieveUserPostsBy,
    retrieveAllPosts,
    retrievePost,
    addCommentToPost,
    retrievePostsBy,
    updateUserHairTextureAndInterests,
    toggleSavePost,
    toggleLikePost,
    toggleDislikePost,
    retrieveUserSavedPosts,
    retrieveUserSavedPostsBy
}
