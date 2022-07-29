const { model } = require('mongoose')
const { section } = require('../schemas')

const Section = model ('Section', section)

module.exports = Section