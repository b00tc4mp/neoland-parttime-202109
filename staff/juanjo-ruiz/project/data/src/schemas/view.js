const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const view = new Schema({

    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    vehicle: {
        type: ObjectId,
        ref: 'vehicle',
        required: true
    },

    title: {
        type: String,
        required: true,
        enum: ['lead', 'rear', 'left', 'right']
    },

    image: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = view