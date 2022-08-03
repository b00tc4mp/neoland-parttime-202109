const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

function validateString(string, explain = 'string') {
    if (typeof string !== 'string') throw new TypeError(`${explain} is not string`)
    if (!string.trim()) throw new FormatError(`${explain} is empty or blank`)
}

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not string`)
    if (!id.trim()) throw new Error(`${explain} is empty or blank`)
    if (id.length !== 24) throw new Error(`invalid ${explain}`)
}

function validateBoolean(boolean, explain = 'boolean') {
    if (typeof boolean !== 'boolean') throw new TypeError(`${explain} is not boolean`)
}

function validateEmail(email) {
    if (typeof email !== 'string') throw new TypeError('email is not string')
    if (!email.trim()) throw new Error('email is empty or blank')
    if (!EMAIL_REGEX.test(email)) throw new Error('invalid email')
}

function validatePassword(password) {
    if (typeof password !== 'string') throw new TypeError('password is not string')
    if (!password.trim()) throw new Error('password is empty or blank')
    if (password.trim().length < 8) throw new Error('password length is smaller than 8 characters')
}

function validateCif(cif) {
    if (typeof cif !== 'string') throw new TypeError('cif is not string')
    if (!cif.trim()) throw new Error('cif is empty or blank')
    if (cif.trim().length < 9) throw new Error('cif length is smaller than 9 characters')
}

function validateDate(date) {
    if (typeof date !== 'function') throw new TypeError('date is not date')
    if (!date.trim()) throw new Error('cif is empty or blank')
}

function validateNumber(number, explain = 'number') {
    if (typeof number !== 'number') throw new TypeError(`${explain} is not number`)
}

function validateObject(object, explain = 'object') {
    if (typeof object !== 'object') throw new TypeError(`${explain} is not object`)
}

function validateToken(token) {
    if (typeof token !== 'string') throw new TypeError('token is not string')
    if (!token.trim()) throw new Error('token is empty or blank')

    const parts = sessionStorage.token.split('.')

    if (parts.length !== 3) throw new Error('invalid token')

    const [, payload64] = parts

    const payloadJson = atob(payload64)

    const payload = JSON.parse(payloadJson)

    if (Math.round(Date.now() / 1000) > payload.exp) throw new Error('token expired')
}


module.exports = {
    validateString,
    validateId,
    validateBoolean,
    validateEmail,
    validatePassword,
    validateCif,
    validateDate,
    validateNumber,
    validateObject,
    validateToken
}