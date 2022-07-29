const { model } = require('mongoose')
const { ingredient } = require('../schemas')

const Ingredient = model ('Ingredient', ingredient)

module.exports = Ingredient