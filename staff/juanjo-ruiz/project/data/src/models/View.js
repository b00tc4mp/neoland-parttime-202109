const { model } = require('mongoose')
const { view } = require('../schemas')

const View = model('View', view)

module.exports = View