import { validators, errors } from 'commons'

const { validateToken, validateId, validateString, validateEmail } = validators
const { DuplicityError, ClientError, ServerError } = errors

export default function (token, userId, name, email, role) {
    validateToken(token)
    validateId(userId, 'user id')
    validateString(name, 'name')
    validateEmail(email)
    validateString(role, 'role')

    return fetch(`http://localhost:8080/api/user/${userId}/update`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, role })
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