const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema
const section = require('./section')

const list = new Schema({

    restaurant: {
        type: ObjectId,
        ref: 'restaurant',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },


    name: {
        type: String,
        required: true
    },

    sections: [section]
    ,

    price: {
        type: Number
    },

    description: {
        type: String
    },

})

module.exports = list