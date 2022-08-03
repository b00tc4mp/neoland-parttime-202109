const { model } = require('mongoose')
const { coordinate } = require('../schemas')

const Coordinate = model('Coordinate', coordinate)

module.exports = Coordinate