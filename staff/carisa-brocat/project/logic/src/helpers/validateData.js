const { errors: { ValueError } } = require("commons")

function validateCategory(category) {
    if (category !== 'product' && category !== 'other' && category !== 'space' && category !== 'question')
        throw new ValueError('category is not valid')
}

function validateSubject(subject) {
    if (subject !== 'growth' && subject !== 'moisture' && subject !== 'strength' && subject !== 'restore' && subject !== 'definition')
        throw new ValueError('subject is not valid')
}

function validateInterests(interests) {
    interests.forEach(interest => {
        if (interest !== 'growth' && interest !== 'moisture' && interest !== 'strength' && interest !== 'restore' && interest !== 'definition')
            throw new ValueError(`interest ${interest} is not valid`)
    })
}

module.exports = {
    validateInterests,
    validateCategory,
    validateSubject
}