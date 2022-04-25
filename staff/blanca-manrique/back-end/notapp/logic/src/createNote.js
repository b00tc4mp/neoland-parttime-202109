const { models: { User, Note } } = require('data')
const {validators: {validateId, validateText, validateBoolean} } = require('commons')

function createNote(userId, text, color, public = false) {
    validateId(userId, 'user id')
    validateText(text, 'text')
    validateText(color, 'color')
    validateBoolean(public, 'public')
    
    return User.findById(userId)
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            return Note.create({ user: userId, text, color, public })
        })
        .then(note => { })
}

module.exports = createNote
