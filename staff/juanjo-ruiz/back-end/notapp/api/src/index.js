require('dotenv').config() //cargamos todas las configuraciones en memoria del archivo .env

const express = require('express')
const { mongoose: { connect } } = require('data')
const cors = require('cors')
const { registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    deleteUser,
    createNote,
    updateNote,
    deleteNote,
    retrieveNotes,
    retrievePublicNotes,
    retrievePublicNotesFromUser,
    findNotes,
    findPublicNotes,
    retrieveNote
} = require('./handlers')

/* const { extractUserIdFromAuthorization } = require('./handlers/helpers') ya no es necesario porque esta implementado en cada handlers*/

const { env: { MONGODB_URL, PORT } } = process

connect(MONGODB_URL)
    .then(() => {
        console.log('db connected to db')

        const api = express()

        api.use(cors())

        const router = express.Router()

        const jsonBodyParser = express.json()

        router.post('/users', jsonBodyParser, registerUser)
        router.post('/users/auth', jsonBodyParser, authenticateUser)
        router.get('/users', retrieveUser)
        router.patch('/users', jsonBodyParser, updateUser)
        router.delete('/users', jsonBodyParser, deleteUser)
        router.post('/notes', jsonBodyParser, createNote)
        router.patch('/notes/:noteId', jsonBodyParser, updateNote)
        router.delete('/notes/:noteId', jsonBodyParser, deleteNote)
        router.get('/notes', retrieveNotes)
        router.get('/notes/public', retrievePublicNotes)
        router.get('/users/:ownerId/notes', jsonBodyParser , retrievePublicNotesFromUser)
        router.get('/notes', findNotes)
        router.get('/notes/public', findPublicNotes)
        router.get('/note/:noteId', retrieveNote)

        api.use('/api', router)

        api.listen(PORT, () => console.log('server running'))

    }) 