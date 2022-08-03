import { validators, errors } from 'commons'

const { validateToken, validateId, validateString, validateNumber, validateObject } = validators
const { DuplicityError, ClientError, ServerError } = errors

export default function (token, vehicleId, side, description, image, coordinates) {
    validateToken(token)
    validateId(vehicleId, 'vehicle id')
    validateString(side, 'side')
    validateString(description, 'description')
    validateString(image, 'image')
    validateObject(coordinates, 'coordinantes')
    validateNumber(coordinates.x, 'x')
    validateNumber(coordinates.y, 'y')

    return fetch(`http://localhost:8080/api/vehicle/${vehicleId}/part`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ side, description, image, coordinates })
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