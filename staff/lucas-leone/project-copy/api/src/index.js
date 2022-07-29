require('dotenv').config()


const { mongoose: { connect } } = require('data')
const express = require('express')
const cors = require('cors')
const { registerUser,
    authenticateUser,
    createList,
    addSectionToList,
    createItem,
    retrieveLists,
    retrieveSections,
    retrieveList,
    retrieveItems,
    deleteSection,
    unregisterRestaurant,
    removeItem,
    retrieveItemsFromSection,
    deleteList,
    retrieveItem,
    retrieveAllergens,
    retrieveIngredients,
    retrieveCategories,
    updateList,
    retrieveSection,
    updateSection,
    updateItem,
    deleteItem,
    retrieveRestaurant,
    updateRestaurant,
    retrieveAllLists
} = require('./handlers')


const { env: { MONGODB_URL, PORT } } = process


connect(MONGODB_URL)
    .then(() => {
        console.log('conected to data base')

        const api = express()

        api.use(cors())

        const router = express.Router()

        const jsonBodyParser = express.json()
        //POST USER
        router.post('/restaurant', jsonBodyParser, registerUser)
        router.post('/restaurant/auth', jsonBodyParser, authenticateUser)
        //LIST POST
        router.post('/username', jsonBodyParser, retrieveAllLists)
        router.post('/list/:listId/section/:sectionId/item', jsonBodyParser, createItem)
        router.post('/list/section/item', jsonBodyParser, retrieveItemsFromSection)
        router.post('/list/:listId/section', jsonBodyParser, addSectionToList)
        router.post('/list/', jsonBodyParser, createList)
        //GET
        router.get('/list', retrieveLists)
        router.get('/list/:listId/section', retrieveSections)
        router.get('/list/:listId/section/:sectionId', retrieveSection)
        router.get('/list/:listId', retrieveList)
        router.get('/item', retrieveItems)
        router.get('/item/:itemId', retrieveItem)
        router.get('/allergen', retrieveAllergens)
        router.get('/category', retrieveCategories)
        router.get('/ingredient', retrieveIngredients)
        router.get('/restaurant', retrieveRestaurant)
        //PATCH
        router.patch('/restaurant', jsonBodyParser, updateRestaurant)
        router.patch('/list/:listId', jsonBodyParser, updateList)
        router.patch('/list/:listId/section/:sectionId', jsonBodyParser, updateSection)
        router.patch('/list/:listId/section/:sectionId/item/:itemId', jsonBodyParser, updateItem)
        //DELETE
        router.delete('/list/:listId/section/:sectionId/item/:itemId', removeItem)
        router.delete('/list/:listId/section/:sectionId', deleteSection)
        router.delete('/restaurant', jsonBodyParser, unregisterRestaurant)
        router.delete('/list/:listId', deleteList)
        router.delete('/item/:itemId', deleteItem)

        api.use('/api', router)

        api.listen(PORT, () => console.log('json server yeah!'))
    })