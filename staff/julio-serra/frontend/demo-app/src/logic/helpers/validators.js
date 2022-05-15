function validateToken(token){
    if (typeof token !== 'string') throw new TypeError(token + ' is not string')
    if (!token.trim()) throw new Error('token is empty or blank')
    if (token.split('.').length !== 3) throw new Error('invalid token')
}

function validateUsername(username){
    if (typeof username !== 'string') throw new TypeError('username is not string')
    if (!username.trim()) throw new Error('username is empty or blank')
}

function validatePassword(password) {
    if (typeof password !== 'string') throw new TypeError('password is not string')
    if (!password.trim()) throw new Error('password is empty or blank')
    if (password.trim().length < 8) throw new Error('password length is smaller than 8 characters')
}

function validateData(data) {
    if (typeof data !== 'object') throw new TypeError('data is not an object')
    if (Object.keys(data).length === 0) throw new Error('data object is empty')
}

function validateCallback(callback) {
    if (typeof callback !== 'function') throw new TypeError('callback  is not a function')

}

function validateQuery(query){
    if (typeof query !== 'string') throw new TypeError('query is not string')
    if (!query.trim()) throw new Error('query is empty or blank')
}

function validateId(id){
    if (typeof id !== 'string') throw new TypeError('id is not string')
    if (!id.trim()) throw new Error('id is empty or blank')
}
function validateName(name){
    if (typeof name !== 'string') throw new TypeError('name is not string')
    if (!name.trim()) throw new Error('name is empty or blank')
}

export {
    validateCallback,
    validateData,
    validateId,
    validateName,
    validatePassword,
    validateQuery,
    validateToken,
    validateUsername
}