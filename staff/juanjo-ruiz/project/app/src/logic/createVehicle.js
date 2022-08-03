import { validators, errors } from 'commons'

const { validateToken, validateString } = validators
const { DuplicityError, ClientError, ServerError } = errors

export default function (token, lisense, brand, model, frame, leasingCompany) {
    validateToken(token)
    validateString(lisense, 'lisense')
    validateString(brand, 'brand')
    validateString(model, 'model')
    validateString(frame, 'frame')
    validateString(leasingCompany, 'leasing company')

    return fetch('http://localhost:8080/api/vehicle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ lisense, brand, model, frame, leasingCompany })
    })
        .then(res => {
            const { status } = res

            if (status === 201)
                return res.json()
                    .then(vehicle => {
                        return vehicle
                    })
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