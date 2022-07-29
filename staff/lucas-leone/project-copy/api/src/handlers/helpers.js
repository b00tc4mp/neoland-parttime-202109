const { verify } = require('jsonwebtoken')
const { env: { JWT_SECRET }} = process

const extractUserIdFromAuthorization = req => {
    const { headers: { authorization } } = req

    const [, token] = authorization.split(' ')

    const { sub: restaurantId } = verify(token, JWT_SECRET)

    return restaurantId
}

module.exports = {
    extractUserIdFromAuthorization
}