const { model } = require('mongoose')
const { company } = require('../schemas')

const Company = model('Company', company)

module.exports = Company