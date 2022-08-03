import { validators, errors } from 'commons'

const { validateToken, validateString } = validators
const { ClientError, ServerError } = errors

export default function (token, query) {
    validateToken(token)
    validateString(query, 'query')

    return fetch(`http://localhost:8080/api/vehicles/search?q=${query}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
                    .then(result => {
                       return result
                    })
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