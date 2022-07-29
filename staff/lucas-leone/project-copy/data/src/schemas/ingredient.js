const {Schema} = require('mongoose')

const ingredient = new Schema({

name: {
    type: String,
    required: true
}
})

module.exports = ingredient