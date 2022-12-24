// import mongoose from 'mogoose'
// const {Schema} = mongoose (idem a línea 3)
// const {ObjectId} = Schema.Types (idem a liena 7?)

const comment = require('./comment')
const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const post = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    category: {
        type: String,
        required: true,
        enum: ['product', 'question', 'space', 'other'],
        default: 'question'
    },

    subject: {
        type: String,
        enum: ['moisture', 'growth', 'restore', 'definition', 'strength']
    },

    image: {
        type: String,
    },

    likes: {
        type: Number,
        default: 0
    },

    dislikes: {
        type: Number,
        default: 0
    },

    date: {
        type: Date,
        required: true,
        default: Date.now,
    },

    address: {
        type: String,
    },

    comments: [comment]
})

module.exports = post