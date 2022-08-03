const registerCompany = require('./registerCompany')
const retrieveCompany = require('./retrieveCompany')
const updateCompany = require('./updateCompany')
const unregisterCompany = require('./unregisterCompany')
const createUser = require('./createUser')
const authenticateUser = require('./authenticateUser')
const retrieveUser = require('./retrieveUser')
const updateUser = require('./updateUser')
const unregisterUser = require('./unregisterUser')
const activateUser = require('./activateUser')
const disableUser = require('./disableUser')
const createVehicle = require('./createVehicle')
const retrieveVehicle = require('./retrieveVehicle')
const retrieveActiveVehicles = require('./retrieveActiveVehicle')
const retrieveDeactivatedVehicles = require('./retrieveDeactivatedVehicles')
const activateVehicle = require('./activateVehicle')
const disableVehicle = require('./disableVehicle')
const updateVehicle = require('./updateVehicle')
const deleteVehicle = require('./deleteVehicle')
const createPart = require('./createPart')
const deletePart = require('./deletePart')
const detailPart = require('./detailPart')
const updatePart = require('./updatePart')
const retrieveAllUsers = require('./retrieveAllUsers')
const retrieveAllParts = require('./retrieveAllParts')
const findVehicles = require('./findVehicles')
const findUsers = require('./findUsers')
const addViewsVehicle = require('./addViewsVehicle')
const retrieveView = require('./retrieveView')

module.exports = {
    registerCompany,
    retrieveCompany,
    updateCompany,
    unregisterCompany,
    createUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    unregisterUser,
    activateUser,
    disableUser,
    createVehicle,
    retrieveVehicle,
    retrieveActiveVehicles,
    retrieveDeactivatedVehicles,
    activateVehicle,
    disableVehicle,
    updateVehicle,
    deleteVehicle,
    createPart,
    deletePart,
    detailPart,
    updatePart,
    retrieveAllUsers,
    retrieveAllParts,
    findVehicles,
    findUsers,
    addViewsVehicle,
    retrieveView
}