const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const { FormatError, AuthError} = require('./errors')

function validateEmail(email) {
    if (typeof email !== 'string') throw new TypeError('email is not string')
    if (!email.trim()) throw new FormatError('email is empty or blank')
    if (!EMAIL_REGEX.test(email)) throw new FormatError('invalid email')
}

function validatePassword(password) {
    if (typeof password !== 'string') throw new TypeError('password is not string')
    if (!password.trim()) throw new FormatError('password is empty or blank')
    if (password.trim().length < 8) throw new FormatError('password length is smaller than 8 characters')
}

function validateCallback(callback) {
    if (typeof callback !== 'function') throw new TypeError('callback is not a function')
}

function validateToken(token) {
    if (typeof token !== 'string') throw new TypeError('token is not string')
    if (!token.trim()) throw new FormatError('token is empty or blank')
    if (token.length !== 172) throw new FormatError('invalid token')

    const parts = token.split('.')

    if (parts.length !== 3) throw new FormatError('invalid token')

    const [, payload64] = parts

    // const payloadJson = Buffer.from(payload64, 'base64').buff.toString('ascii') //cuando no se usa el validate del jsonwebtoken y por tanto se usa el buffer para decodificar
    const payloadJson = atob(payload64)

    const payload = JSON.parse(payloadJson)

    if (Math.round(Date.now() / 1000) > payload.exp) throw new AuthError('token expired')
}

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not string`)
    if (!id.trim()) throw new FormatError(`${explain} is empty or blank`)
    if (id.length !== 24) throw new FormatError(`invalid ${explain}`)
}

function validateString(string, explain = 'string') {
    if (typeof string !== 'string') throw new TypeError(`${explain} is not string`)
    if (!string.trim()) throw new FormatError(`${explain} is empty or blank`)
}

function validateArray(array) {
    if (!Array.isArray(array)) throw new TypeError(`${array} is not an array`)
}

function validateBoolean(boolean, explain = 'boolean') {
    if (typeof boolean !== 'boolean') throw new TypeError(`${explain} is not boolean`)
}

module.exports = {
    validateEmail,
    validatePassword,
    validateCallback,
    validateToken,
    validateId,
    validateString,
    validateArray,
    validateBoolean
}