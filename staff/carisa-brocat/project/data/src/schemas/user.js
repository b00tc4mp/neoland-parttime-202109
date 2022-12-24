// import mongoose from 'mogoose'
// const {Schema} = mongoose (idem a línea 3)

const { Schema, Types: { ObjectId } } = require('mongoose')

const user = new Schema({
    nickname: {
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
        required: true,
    },

    image: {
        type: String, // "qasfas0892348wasdfasdf.png"
    },

    hairTexture: {
        type: String,
        enum: ['3a', '3b', '3c', '4a', '4b', '4c', ''],
    },

    interests: {
        type: [{
            type: String,
            enum: ['moisture', 'growth', 'restore', 'definition', 'strength']
        }]
    },

    savedPosts: {
        type: [{ type: ObjectId, ref: 'Post' }]
    },

    likedPosts: {
        type: [{ type: ObjectId, ref: 'Post' }],
    },

    dislikedPosts: {
        type: [{ type: ObjectId, ref: 'Post' }],
    },

    quizPassed: {
        type: Boolean,
        default: false,
    }
})

module.exports = user