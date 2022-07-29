import { validators, errors } from "commons";

const { validateToken, validateId } = validators
const { ClientError, ServerError } = errors


export default function (token,listId) {
    validateToken(token)
    validateId(listId, 'list id')

    return fetch(`http://localhost:8080/api/list/${listId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        },

    })
        .then(res => {
            const { status } = res
            if (status === 200)
                return res.json()
                    .then(list => { 
                        list.date = new Date(list.date)

                        return list
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