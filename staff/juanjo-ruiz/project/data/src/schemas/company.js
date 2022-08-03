const { Schema } = require('mongoose')

const company = new Schema({
    businessName: {
        type: String,
        required: true
    },

    cif: {
        type: String,
        required: true,
        unique: true
    },
    
    active: {
        type: Boolean,
        required: true,
        default: true
    },

    date: {
        type: Date,
        require: true,
        default: Date.now
    }
})

module.exports = company