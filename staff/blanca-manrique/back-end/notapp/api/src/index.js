require('dotenv').config()

const { mongoose: { connect } } = require('data')
const express = require('express')
const cors = require('cors')
const { registerUser, authenticateUser, retrieveUser, updateUser, deleteUser, createNote, updateNote, deleteNote, retrieveNote,retrieveNotes, retrievePublicNotes, retrievePublicNotesFromUser, addCommentToNote} = require('./handlers')

const { env: { MONGODB_URL, PORT } } = process

connect(MONGODB_URL)
    .then(() => {
        console.log('database connected')

        const api = express()

        api.use(cors())

        const router = express.Router()

        const jsonBodyParser = express.json()

        router.post('/users', jsonBodyParser, registerUser)
        router.post('/users/auth', jsonBodyParser, authenticateUser)
        router.get('/users', retrieveUser)
        router.patch('/users', jsonBodyParser, updateUser)
        router.delete('/users', jsonBodyParser, deleteUser)
        router.post('/notes/:noteId/comments', jsonBodyParser, addCommentToNote)
        router.post('/notes', jsonBodyParser, createNote)
        router.patch('/notes/:noteId', jsonBodyParser, updateNote)
        router.delete('/notes/:noteId', deleteNote)
        router.get('/notes', retrieveNotes)
        router.get('/notes/public', retrievePublicNotes)
        router.get('/notes/:noteId', retrieveNote)
        router.get('/users/:ownerId/notes', retrievePublicNotesFromUser)


        api.use('/api', router)

        api.listen(PORT, () => console.log(`server listening on ${PORT}`))
    })