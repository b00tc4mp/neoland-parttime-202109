import { validators, errors } from 'commons'

const { validateToken} = validators
const { ClientError, ServerError } = errors

export default function (token, password) {
    validateToken(token)

    return fetch(`http://localhost:8080/api/restaurant`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
    })
        .then(res => {
            const { status } = res

            if (status === 204)
                return
            else if (status >= 400 && status < 500)
                return res.json()
                    .then(payload => {
                        const { error: message } = payload

                        throw new ClientError(message)
                    })
            else if (status >= 500)
                return res.text()
                    .then(text => {
                        throw new ServerError(text)
                    })
        })
}