const { model } = require('mongoose')
const { user } = require('../schemas')

const User = model('User', user)

module.exports = User