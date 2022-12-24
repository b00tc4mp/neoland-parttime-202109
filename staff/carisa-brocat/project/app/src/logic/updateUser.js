import { validators, errors } from 'commons'
import config from './config.js'
const {URL} = config
const { AuthError, NotFoundError, ServerError, ClientError } = errors
const { validateString, validateToken, validateArray } = validators

function updateUser(token, nickname, image, hairTexture, interests) {
    validateToken(token)
    validateString(nickname, 'nickname')
    validateString(hairTexture, 'hairTexture')
    validateArray(interests)

    return fetch(`${URL}/users`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`

        },
        body: JSON.stringify({ nickname, image, hairTexture, interests}) //el metodo JSON.stringify convierte valores javascript a JSON
    })
        .then(res => {
            const { status } = res

            if (status === 204)
                return
            else if (status >= 400 && status < 500)
                return res.json()
                    .then(data => {
                        const { error: message } = data

                        if (status === 401)
                            throw new AuthError(message)
                        else if (status === 404)
                            throw new NotFoundError(message)
                        else
                            throw new ClientError(message)
                    })
            else if (status >= 500)
                return res.text()
                    .then(text => {
                        throw new ServerError(text)
                    })
        })
}

export default updateUser
