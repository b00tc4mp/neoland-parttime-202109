require('dotenv').config()

const { mongoose: { connect, disconnect } } = require('data')
const express = require('express')
const cors = require('cors')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    updatePassword,
    updateEmail,
    updateUser,
    deleteUser,
    createPost,
    deletePost,
    retrieveUserPosts,
    retrieveAllPosts,
    retrievePost,
    updatePostFeedback,
    addCommentToPost,
    retrievePostsBy,
    updateUserHairTextureAndInterests,
    updateFavoritePosts,
} = require('./handlers')


const { env: { MONGODB_URL, PORT } } = process

connect(MONGODB_URL)
    .then(() => {
        console.log('Database connected')

        const api = express()

        api.use(cors())

        const router = express.Router()

        const jsonBodyParser = express.json()

        router.post('/users', jsonBodyParser, registerUser)
        router.post('/users/auth', jsonBodyParser, authenticateUser)
        router.get('/users', retrieveUser)
        router.patch('/users', jsonBodyParser, updateUser)
        router.patch('/users/password', jsonBodyParser, updatePassword)
        router.patch('/users/email', jsonBodyParser, updateEmail)
        router.patch('/users/hairTextAndInterests', jsonBodyParser, updateUserHairTextureAndInterests)
        router.patch('/users/favoritePosts', jsonBodyParser, updateFavoritePosts)
        router.delete('/users', jsonBodyParser, deleteUser)
        router.post('/posts', jsonBodyParser, createPost)
        router.delete('/posts/:postId', jsonBodyParser, deletePost)
        router.get('/user/posts', retrieveUserPosts)
        router.get('/posts', retrieveAllPosts)
        router.get('/posts/by', jsonBodyParser, retrievePostsBy)
        router.get('/posts/:postId', jsonBodyParser, retrievePost)
        router.patch('/posts/:postId', jsonBodyParser, updatePostFeedback)
        router.post('/posts/:postId/comment', jsonBodyParser, addCommentToPost)

        api.use('/api', router)

        api.listen(PORT, () => console.log(`server is listening on port ${PORT}`))
    })








/* El Intercambio de Recursos de Origen Cruzado (CORS (en-US))
 es un mecanismo que utiliza cabeceras HTTP adicionales para permitir
  que un user agent (en-US) obtenga permiso para acceder a
   recursos seleccionados desde un servidor, en un origen 
   distinto (dominio) al que pertenece.
   
   Por razones de seguridad, los exploradores restringen las solicitudes HTTP
    de origen cruzado iniciadas dentro de un script. Por ejemplo, XMLHttpRequest
     y la API Fetch siguen la política de mismo-origen. Ésto significa que una
      aplicación que utilice esas APIs XMLHttpRequest sólo puede hacer solicitudes
       HTTP a su propio dominio, a menos que se utilicen cabeceras CORS*/