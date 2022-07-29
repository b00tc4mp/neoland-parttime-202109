import { validators, errors } from 'commons'

const { validateToken, validateId } = validators
const { ClientError, ServerError } = errors

export default function (token, listId, sectionId, itemId) {
    validateToken(token)
    validateId(listId,'list id')
    validateId(sectionId,'section id')
    validateId(itemId,'item id')
    
    return fetch(`http://localhost:8080/api/list/${listId}/section/${sectionId}/item/${itemId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
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