const {Schema} = require('mongoose')

const allergen = new Schema({

    name: {
        type: String,
        required: true
    }
})

module.exports = allergen