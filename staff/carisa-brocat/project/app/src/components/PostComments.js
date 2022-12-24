import './PostComments.css'
import { addCommentToPost } from '../logic'
import { useContext } from 'react'
import Context from './Context'

import { errors } from 'commons'
const { AuthError, NotFoundError } = errors

export default ({ postId, comments, handleCloseModal, handleNewComments }) => {
    const { setFeedback } = useContext(Context)

    const handleAddComment = event => {
        event.preventDefault()


        const { target: { text: { value: text } } } = event

        try {
            addCommentToPost(sessionStorage.token, postId, text)
                .then(() => {
                    handleCloseModal()
        
                    setFeedback({ level: 'info', message: 'Comment added successfully' })

                    handleNewComments()
                })
                .catch(error => {
                    setFeedback({ level: 'error', message: error.message })
                })
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <div className='PostComments'>
        <h2>Comments</h2>
        <div className='PostComments__list'>
            {
                comments.length ?
                    <ul> {comments.map(comment => <li key={comment.id}>
                        <p className='PostComments__date'>{comment.date}</p>
                        <p className='PostComments__text'>{comment.text}</p>
                    </li>)}
                    </ul> :
                    <p>Sorry, there are no comments to show</p>
            }
        </div>
        <form className="PostComments__form" onSubmit={handleAddComment}>
            <textarea className="PostComments__input" name="text" placeholder="Add a new comment" required></textarea>
            <button className='PostComments__button'>+</button>
        </form>
    </div>
}