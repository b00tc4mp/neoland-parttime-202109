import { validators, errors } from 'commons'
import config from './config.js'
const {URL} = config
const { DuplicityError, ServerError, ClientError } = errors
const { validateString, validatePassword, validateEmail } = validators

function registerUser(nickname, email, password) {
    validateString(nickname, 'nickname')
    validateEmail(email)
    validatePassword(password)

    return fetch(`${URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nickname, email, password }) //el metodo JSON.stringify convierte valores javascript a JSON
    })
        .then(res => {
            const { status } = res

            if (status === 201)
                return
            else if (status >= 400 && status < 500)
                return res.json()
                    .then(data => {
                        const { error: message } = data

                        if (status === 409)
                            throw new DuplicityError(message)
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

export default registerUser
