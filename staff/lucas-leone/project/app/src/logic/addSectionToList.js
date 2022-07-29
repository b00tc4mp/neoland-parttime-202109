import { validators, errors } from 'commons'

const { validateToken, validateString,validateId } = validators
const { ClientError, ServerError } = errors

export default function (token, listId, name) {
    validateToken(token)
    validateId(listId, 'list id')
    validateString(name, 'name')

    return fetch(`http://localhost:8080/api/list/${listId}/section`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
                    .then(section => {
                        const { sectionId } = section
                        const sectionIdString = sectionId.toString()
                        return sectionIdString
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