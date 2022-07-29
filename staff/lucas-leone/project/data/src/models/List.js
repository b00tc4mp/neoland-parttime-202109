const { model } = require('mongoose')
const { list } = require('../schemas')

const List = model ('List', list)

module.exports = List