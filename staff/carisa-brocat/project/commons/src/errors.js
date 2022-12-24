class DuplicityError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class AuthError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class ClientError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class ServerError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class FormatError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class ConditionError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class ValueError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

module.exports = {
    DuplicityError,
    AuthError,
    NotFoundError,
    ClientError,
    ServerError,
    FormatError, //status 400
    ConditionError,
    ValueError
}

//MDN http status (codigo de errores)
//AuthError (401)

//ForbiddenError 403(cuando no se tiene autorizacion para ciertos contenidos))

//Bad Request (400 (el servidor no pudo interpretar la solicitud dada por una sintaxis invalida))

//NotFound (404)

//Gone 410(cuando el contenido ha sido borrado del servidor))

//ServerError (500)

//ClientError (400 to 451)


