const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const section = new Schema({


    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    name: {
        type: String,
        required: true
    },

    items: [{
        type: ObjectId,
        ref: 'Item'
    }]

})

module.exports = section