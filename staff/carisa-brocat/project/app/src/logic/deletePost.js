import { validators, errors } from 'commons'
import config from './config.js'
const {URL} = config
const { AuthError, NotFoundError, ServerError, ClientError } = errors
const { validateToken, validateId } = validators

function deletePost(token, postId) {
    validateToken(token)
    validateId(postId)

    return fetch(`${URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            const { status } = res

            if (status === 204)
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

export default deletePost
