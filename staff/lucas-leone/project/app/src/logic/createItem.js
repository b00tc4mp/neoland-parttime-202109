import { validators, errors } from 'commons'
import { validateArray, validateNumber } from 'commons/src/validators'

const { validateToken, validateString,validateId } = validators
const { ClientError, ServerError, DuplicityError } = errors

export default function (token, listId, sectionId, name, categories, ingredients, allergens, price) {
    validateToken(token)
    validateId(listId, 'list id')
    validateString(name, 'name')
    if(categories){validateArray(categories, 'categories')}
    if(ingredients){validateArray(ingredients, 'ingredients')}
    if(allergens){validateArray(allergens, 'allergens')}
    if(price){validateNumber(price,'price')}

    return fetch(`http://localhost:8080/api/list/${listId}/section/${sectionId}/item`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, categories, ingredients, allergens, price })
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