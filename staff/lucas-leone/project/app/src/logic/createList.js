import { validators, errors } from 'commons'

const { validateToken, validateString } = validators
const { ClientError, ServerError, DuplicityError } = errors

export default function (token, name, description) {
    validateToken(token)
    validateString(name, 'name')
    if(description){validateString(description, 'description')}

    return fetch('http://localhost:8080/api/list', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
    })
        .then(res => {
            const { status } = res

            if (status === 201)
                return
            else if (status >= 400 && status < 500)
                return res.json()
                    .then(payload => {
                        const { error: message } = payload
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