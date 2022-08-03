const { model } = require('mongoose')
const { part } = require('../schemas')

const Part = model('Part', part)

module.exports = Part