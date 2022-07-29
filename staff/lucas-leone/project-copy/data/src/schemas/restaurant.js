const { Schema } = require('mongoose')

const restaurant = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    color:{
        type: String
    },
    
    image:{
        type: String,
    }

    
})

module.exports = restaurant