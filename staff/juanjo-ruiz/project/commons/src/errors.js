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

module.exports = {
    DuplicityError,
    AuthError,
    NotFoundError,
    ClientError,
    ServerError,
    FormatError
}