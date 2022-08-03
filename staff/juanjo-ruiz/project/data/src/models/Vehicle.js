const { model } = require('mongoose')
const { vehicle } = require('../schemas')

const Vehicle = model('Vehicle', vehicle)

module.exports = Vehicle