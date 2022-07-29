const { model } = require('mongoose')
const { restaurant } = require('../schemas')

const Restaurant = model ('Restaurant', restaurant)

module.exports = Restaurant