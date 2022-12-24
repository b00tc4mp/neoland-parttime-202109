// import mongoose from 'mogoose'
// const {Schema} = mongoose (idem a línea 3)
// const {ObjectId} = Schema.Types (idem a liena 7?)

const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const comment = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    text: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
        required: true,
    },

})

module.exports = comment