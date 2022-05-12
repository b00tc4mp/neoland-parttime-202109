const { models: { User, Note }} = require('data')

function deleteNote(userId, noteId) {
    // TODO validate input arguments

    return User.findById(userId) 
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            return Note.findById(noteId)
        })
        .then(note => {
            if (!note) throw new Error(`note with id ${noteId} not found`)

            if (note.user.toString() !== userId) throw new Error(`note with id ${noteId} does not correspond to user with id ${userId}`)

            return Note.deleteOne({ _id: noteId })
        })
        .then(result => {})
}

module.exports = deleteNote