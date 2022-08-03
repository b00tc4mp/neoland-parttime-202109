const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema
const part = require('./part')
const view = require('./view')

const vehicle = new Schema({
    company: {
        type: ObjectId,
        ref: 'Company',
        required: true
    },

    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    lisense: {
        type: String,
        required: true,
        unique: true
    },

    brand: {
        type: String,
        required: true
    },

    model: {
        type: String,
        required: true
    },

    frame: {
        type: String,
        required: true,
        unique: true
    },

    leasingCompany: {
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        required: true,
        default: true
    },
    
    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    views: [view],
    
    parts: [part]
})

module.exports = vehicle