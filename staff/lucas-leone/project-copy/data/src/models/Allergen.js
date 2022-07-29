const { model } = require('mongoose')
const { allergen } = require('../schemas')

const Allergen = model ('Allergen', allergen)

module.exports = Allergen