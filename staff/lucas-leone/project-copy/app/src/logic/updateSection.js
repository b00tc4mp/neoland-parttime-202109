import { validators, errors } from 'commons'
const { validateToken, validateString,validateId } = validators
const { ClientError, ServerError } = errors

export default function (token, listId, sectionId, name, items) {
    validateToken(token)
    validateId(listId, 'list id')
    validateId(sectionId)
    validateString(name, 'name')

    return fetch(`http://localhost:8080/api/list/${listId}/section/${sectionId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, items })
    })
        .then(res => {
            const { status } = res

            if (status === 204)
                return
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