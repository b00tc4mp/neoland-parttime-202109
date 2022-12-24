import './Post.css'
import { useEffect, useState } from 'react'
import { updatePostFeedback, updateUserPostsFeedback } from '../logic'
import { errors } from 'commons'
const { AuthError } = errors

export default ({ post, user }) => {
    const [likes, setLikes] = useState(post.likes || 0)
    const [dislikes, setDislikes] = useState(post.dislikes || 0)

    const [userLiked, setUserLiked] = useState(user.likesPosts)
    const [userDisliked, setUserDisliked] = useState(user.dislikesPosts)


    const [savedPosts, setSavedPosts] = useState(user.savedPosts)

    const postId = post.id

    useEffect(() => {
        savePostFeedback()

        saveUserPostsFeedback()

    }, [likes, dislikes])


    const savePostFeedback = () => {
        try {
            updatePostFeedback(sessionStorage.token, postId, likes, dislikes)
                .then()
                .catch(error => {
                    if (error instanceof AuthError)
                        delete sessionStorage.token

                    alert(error.message)
                })
        } catch (error) {
            if (error instanceof AuthError)
                delete sessionStorage.token

            alert(error.message)
        }
    }

    const saveUserPostsFeedback = () => {
        try {
            updateUserPostsFeedback(sessionStorage.token, userLiked, userDisliked)
                .then()
                .catch(error => {
                    if (error instanceof AuthError)
                        delete sessionStorage.token

                    alert(error.message)
                })
        } catch (error) {
            if (error instanceof AuthError)
                delete sessionStorage.token

            alert(error.message)
        }
    }

    // const updateSavedPosts = () => {
    //     try {
    //         updateSavedPosts(sessionStorage.token, savedPosts)
    //             .then()
    //             .catch(error => {
    //                 if (error instanceof AuthError)
    //                     delete sessionStorage.token

    //                 alert(error.message)
    //             })
    //     } catch (error) {
    //         if (error instanceof AuthError)
    //             delete sessionStorage.token

    //         alert(error.message)
    //     }
    // }

    const handleLikes = () => {
        if (userLiked.includes(postId)) {
            const likesDecreased = likes - 1
            setLikes(likesDecreased)

            const userLikedPosts = userLiked.filter(post_id => post_id !== postId)
            setUserLiked(userLikedPosts)
        }
        else {
            const likesIncreased = likes + 1
            setLikes(likesIncreased)

            //const userLikedPosts = [...userLiked,postId] //usando desustructuraci'on en lugar de push
            const userLikedPosts = userLiked
            userLikedPosts.push(postId)
            setUserLiked(userLikedPosts)
        }
    }

    const handleDislikes = () => {
        if (user.includes(postId)) {
            const dislikesDecreased = dislikes - 1
            setDislikes(dislikesDecreased)

            const userDislikedPosts = userDisliked.filter(post_id => post_id !== postId)
            setUserDisliked(userDislikedPosts)
        }
        else {
            const dislikesIncreased = dislikes + 1
            setDislikes(dislikesIncreased)

            //const userLikedPosts = [...userLiked,postId] //usando desustructuraci'on en lugar de push
            const userDislikedPosts = userDisliked
            userDislikedPosts.push(postId)
            setUserDisliked(userDislikedPosts)
        }
    }

    return <div className="post">
        <div className="post__header">
            <p>{post.userNickname}</p>
            <p>{post.subject}</p>
        </div>
        <div className="post__body">
            <h1 className="post__body-title">{post.title}</h1>
            <div className="post__body-description">
                {
                    post.image ?
                        (<p>{post.image}</p>)
                            (<p>{post.description}</p>)
                        :
                        <p>{post.description}</p>
                }
                <p>{post.address}</p>
            </div>
        </div>
        <div className="post__footer">
            <div className="post__footer-feedback">
                <div className="post__footer-feedback post__footer-feedback__likes">
                    <button onClick={handleLikes}>Likes</button>
                    {
                        likes ? <p>{likes}</p> : <p>0</p>
                    }
                </div>
                <div className="post__footer-feedback post__footer-feedback__dislikes">
                    <button onClick={handleDislikes}>Dislikes</button>
                    {
                        dislikes ? <p>{dislikes}</p> : <p>0</p>
                    }
                </div>
            </div>
            <button className='post__footer--saveButton' /*{</div>onClick={handleFavoritePosts}*/>SavePost</button>
        </div>

    </div>

}