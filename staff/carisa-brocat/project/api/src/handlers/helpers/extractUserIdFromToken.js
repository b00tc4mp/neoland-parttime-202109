const { errors: { ClientError }, validators: { validateToken } } = require('commons')
const { verify } = require('jsonwebtoken')
const { env: { JWT_SECRET } } = process

module.exports = req => {

    const { headers: { authorization } } = req

    const [, token] = authorization.split(' ')

    validateToken(token)

    try {
        const { sub: userId } = verify(token, JWT_SECRET) //el verify, verifica y devuelve el token decodificado como se creo en el authenticate

        return userId

    } catch (error) {
        throw new ClientError(error.message)
    }

}
