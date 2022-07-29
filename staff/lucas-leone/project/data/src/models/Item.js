const { model } = require('mongoose')
const { item } = require('../schemas')

const Item = model ('Item', item)

module.exports = Item