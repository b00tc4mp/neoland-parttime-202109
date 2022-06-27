const { Schema } = require('mongoose')

const user = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required: true
    }
})

module.exports = user