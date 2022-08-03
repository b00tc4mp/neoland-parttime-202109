import { validators, errors } from 'commons'

const { validateEmail, validatePassword } = validators
const { AuthError, ClientError, ServerError } = errors

export default function (email, password) {
    validateEmail(email)
    validatePassword(password)

    return fetch('http://localhost:8080/api/user/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
                    .then(payload => {
                        const { token } = payload

                        return token
                    })
            else if (status >= 400 && status < 500)
                return res.json()
                    .then(payload => {
                        const { error: message } = payload

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