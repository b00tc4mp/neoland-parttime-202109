const { model } = require('mongoose')
const { post } = require('../schemas')

const Post = model('Post', post)

module.exports = Post
