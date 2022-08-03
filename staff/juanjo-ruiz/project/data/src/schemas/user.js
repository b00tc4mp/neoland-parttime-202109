const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const user = new Schema({
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

    businessId: {
        type: String
    },

    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: Number
    },

    dischargeDate: {
        type: Date
    },

    image: {
        type: String
    },

    role: {
        type: String,
        required: true,
        default: 'driver',
        enum: ['driver', 'admin', 'owner']
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
    }
})

module.exports = user