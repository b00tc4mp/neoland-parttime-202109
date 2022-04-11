const { models: { User, Note }} = require('data')
const { 
    validators: { validateId, validateString, validateBoolean },
    errors: { NotFoundError, AuthError }
} = require('commons')

function updateNote(userId, noteId, text, color, _public) {
    // TODO validate input arguments
    validateId(userId, 'user id')
    validateId(noteId, 'note id')
    validateString(text, 'text')
    validateString(color, 'color')
    validateBoolean(_public, 'public')

    // return Note.updateOne({ user: userId, _id: noteId }, { text, color, public: _public })
    //     .then(result => {
    //         const { matchedCount } = result

    //         if (matchedCount === 0) throw new Error(`note with id ${noteId} and user id ${userId} not found`)
    //     })

    return Promise.all([User.findById(userId), Note.findById(noteId)])
        .then(([user, note]) => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)
            if (!note) throw new NotFoundError(`note with id ${noteId} not found`)

            if (note.user.toString() !== userId) throw new AuthError(`note with id ${noteId} does not belong to user with id ${userId}`)

            note.text = text
            note.color = color
            note.public = _public      
            
            return note.save()
        })
        .then(note => {})
}

module.exports = updateNote