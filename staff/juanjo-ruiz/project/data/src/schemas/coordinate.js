const { Schema } = require('mongoose')

const coordinate = new Schema({
    x: {
        type: Number,
        required: true
    },

    y: {
        type: Number,
        required: true
    }
})

module.exports = coordinate