import { validators, errors } from 'commons'
import config from './config.js'
const {URL} = config
const { ServerError, ClientError, AuthError } = errors
const { validatePassword, validateEmail } = validators

function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    return fetch(`${URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) //el metodo JSON.stringify convierte valores javascript a JSON
    })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
                    .then(data => {
                        const { token } = data
                        return token
                    })
            else if (status >= 400 && status < 500)
                return res.json()
                    .then(data => {
                        const { error: message } = data

                        if (status === 401)
                            throw new AuthError(message)
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

export default authenticateUser
