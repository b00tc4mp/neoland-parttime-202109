import { validators, errors } from 'commons'

const { validateString, validatePassword, validateEmail } = validators
const { DuplicityError, ClientError, ServerError } = errors

export default function (businessName, cif, name, email, password) {
    validateString(businessName, 'business name')
    validateString(cif, 'cif')
    validateString(name, 'name')
    validateEmail(email)
    validatePassword(password)

    return fetch('http://localhost:8080/api/company', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ businessName, cif, name, email, password })
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