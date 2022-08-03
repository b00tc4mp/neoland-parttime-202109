import { validators, errors } from 'commons'

const { validateToken, validateId } = validators
const { DuplicityError, ClientError, ServerError } = errors

export default function (token, vehicleId, password) {
    validateToken(token)
    validateId(vehicleId, 'vehicle id')

    return fetch(`http://localhost:8080/api/vehicle/${vehicleId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password })
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