const { model } = require('mongoose')
const { category } = require('../schemas')

const Category = model ('Category', category)

module.exports = Category