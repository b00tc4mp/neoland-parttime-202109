import { validators, errors } from 'commons'
const { validateUsername, validateEmail, validatePassword } = validators
const { DuplicityError, ClientError, ServerError } = errors

export default function (username, email, password) {
    validateUsername(username)
    validateEmail(email)
    validatePassword(password)

    return fetch('http://localhost:8080/api/restaurant', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })

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