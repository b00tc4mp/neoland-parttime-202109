import { errors, validators } from 'commons'
const { validateString, validateToken, validateId, validateNumber} = validators
const { ClientError, ServerError } = errors

export default function (token, listId, name, description, price) {
    validateToken(token)
    validateId(listId, 'list id')
    validateString(name, 'name')
    validateString(description, 'description')
    if(price){validateNumber(price,'price')}
    
    return fetch(`http://localhost:8080/api/list/${listId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, price })
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