import { validators, errors } from 'commons'
import config from './config.js'
const {URL} = config
const { validateId, validateString } = validators
const { ServerError, ClientError, NotFoundError, AuthError } = errors
const { validateToken } = validators

function addCommentToPost(token, postId, text) {
    validateToken(token)
    validateId(postId, 'postId')
    validateString(text, 'text')

    return fetch(`${URL}/posts/${postId}/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text })
    })
        .then(res => {
            const { status } = res

            if (status === 201)
                return
            else if (status >= 400 && status < 500)
                return res.json()
                    .then(data => {
                        const { error: message } = data

                        if (status === 401)
                            throw new AuthError(message)
                        else if (status === 404)
                            throw new NotFoundError(message)
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

export default addCommentToPost
