import { validators, errors } from 'commons'
import config from './config.js'
const {URL} = config
const { ServerError, ClientError, NotFoundError, AuthError } = errors
const { validateToken } = validators

function retrieveUser(token) {
    validateToken(token)

    return fetch(`${URL}/users`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
                    .then(user => {
                        return user
                    })
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

export default retrieveUser
