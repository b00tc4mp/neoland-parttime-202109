//const EMAIL_REGEX = /[a-z]+\@[a-z]+\.[a-z]+/i 
const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const { FormatError } = require('./errors')

function validateUsername(username) {
    if (typeof username !== 'string') throw new TypeError('username is not string')
    if (!username.trim()) throw new FormatError('username is empty or blank')
}

function validateEmail(email) {
    if (typeof email !== 'string') throw new TypeError('email is not string')
    if (!email.trim()) throw new FormatError('email is empty or blank')
    if (!EMAIL_REGEX.test(email)) throw new FormatError('invalid email')
}

function validatePassword(password) {
    if (typeof password !== 'string') throw new TypeError('password is not string')
    if (!password.trim()) throw new FormatError('password is empty or blank')
    if (password.trim().length < 5) throw new FormatError('password length is smaller than 5 characters')
}

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not string`)
    if (!id.trim()) throw new FormatError(`${explain} is empty or blank`)
    if (id.length !== 24) throw new FormatError(`invalid ${explain}`) //id de Mongo = 24 caracteres
}

function validateString(string, explain = 'string') {
    if (typeof string !== 'string') throw new TypeError(`${explain} is not string`)
    if (!string.trim()) throw new FormatError(`${explain} is empty or blank`)
}

function validateBoolean(boolean, explain = 'boolean') {
    if (typeof boolean !== 'boolean') throw new TypeError(`${explain} is not boolean`)
}

function validateNumber(number, explain = 'number') {
    if (typeof number !== 'number') throw new TypeError(`${explain} is not number`)
}

function validateArray(array) {
    if (!Array.isArray(array)) throw new TypeError(`${array} is not an array`)
}

function validateToken(token) {
    if (typeof token !== 'string') throw new TypeError('token is not string')
    if (!token.trim()) throw new FormatError('token is empty or blank')

    const parts = sessionStorage.token.split('.')

    if (parts.length !== 3) throw new FormatError('invalid token')

    const [, payload64] = parts

    const payloadJson = atob(payload64) 

    const payload = JSON.parse(payloadJson)

    if (Math.round(Date.now() / 1000) > payload.exp) throw new Error('token expired')
}


module.exports = {
    validateUsername,
    validateEmail,
    validatePassword,
    validateId,
    validateString,
    validateBoolean,
    validateNumber,
    validateArray,
    validateToken
}
