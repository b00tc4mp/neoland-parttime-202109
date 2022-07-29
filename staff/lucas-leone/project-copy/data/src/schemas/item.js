const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const item = new Schema({


    restaurant: {
        type: ObjectId,
        ref: 'Restaurant',
        required: true
    },

    name: {
        type: String,
        required: true
    },


    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    categories: [{
        type: ObjectId,
        ref: 'Category'
    }],

    ingredients: [{
        type: ObjectId,
        ref: 'Ingredient'
    }],

    allergens: [{
        type: ObjectId,
        ref: 'Allergen'
    }],

    image: {
        type: String
    },

    price: {
        type: Number
    },

})

module.exports = item