import { validators, errors } from 'commons'
import config from './config.js'
const {URL} = config
const { AuthError, ServerError, ClientError, NotFoundError } = errors
const { validateToken, validatePassword } = validators

function deleteUser(token, password) {
    validatePassword(password)
    validateToken(token)

    return fetch(`${URL}/users`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password }) //el metodo JSON.stringify convierte valores javascript a JSON
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

export default deleteUser
