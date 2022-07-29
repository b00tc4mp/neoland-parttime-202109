import { validators, errors } from "commons";
import { validateArray } from "commons/src/validators";

const { validateToken } = validators
const { ClientError, ServerError } = errors


export default function (token, items) {
    validateToken(token)
    if(items){validateArray(items, 'items')}

    return fetch('http://localhost:8080/api/list/section/item', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items })

    })
        .then(res => {
            const { status } = res
            if (status === 200)
                return res.json()
                    .then(items => {
                        items.forEach(item => item.date = new Date(item.date))

                        return items
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