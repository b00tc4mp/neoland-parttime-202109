import { validators, errors } from "commons";

const { validateString } = validators
const { ClientError, ServerError } = errors


export default function (username) {
    validateString(username)

    return fetch('http://localhost:8080/api/username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })

    })
        .then(res => {
            const { status } = res
            if (status === 200)
                return res.json()
                    .then(lists => {
                        lists.forEach(list => list.date = new Date(list.date))

                        return lists
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