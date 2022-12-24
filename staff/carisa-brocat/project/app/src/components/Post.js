import './Post.css'
import Modal from './Modal'
import PostComments from './PostComments'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import Context from './Context'
import { useLocation } from 'react-router-dom'
import { toggleDislikePost, toggleLikePost, toggleSavePost, deletePost, retrievePost } from '../logic'
import { errors } from 'commons'
const { AuthError, NotFoundError } = errors

export default ({ postId, user, handlePostDeleted, handleUnsavePost }) => {
    const { setFeedback } = useContext(Context)
    const location = useLocation()
    const [modalOpen, setModalOpen] = useState(false)
    const [post, setPost] = useState()

    const [likes, setLikes] = useState()
    const [dislikes, setDislikes] = useState()
    const [userDislikedPosts, setUserDislikedPosts] = useState(user.dislikedPosts || [])
    const [userLikedPosts, setUserLikedPosts] = useState(user.LikedPosts || [])
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState(false)

    const savedStatus = user.savedPosts.includes(postId)
    const [postSaved, setPostSaved] = useState(savedStatus)

    const loadPost = () => {
        try {
            retrievePost(sessionStorage.token, postId)
                .then(post => {
                    setPost(post)
                    setLikes(post.likes)
                    setDislikes(post.dislikes)
                    setComments(post.comments)
                })
                .catch(error => {
                    setFeedback({ level: 'error', message: error.message })
                })
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    useEffect(() => {
        loadPost()
    }, [newComment])

    const addUserDislikedPost = () => {
        const userNewDislikedPosts = userDislikedPosts
        userNewDislikedPosts.push(postId)
        setUserDislikedPosts(userNewDislikedPosts)
    }

    const deleteUserDislikedPost = () => {
        const userNewDislikedPosts = userDislikedPosts.filter(_postId => _postId !== postId)
        setUserDislikedPosts(userNewDislikedPosts)
    }

    const addUserLikedPost = () => {
        const userNewLikedPosts = userLikedPosts
        userNewLikedPosts.push(postId)
        setUserLikedPosts(userNewLikedPosts)
    }

    const deleteUserLikedPost = () => {
        const userNewLikedPosts = userLikedPosts.filter(_postId => _postId !== postId)
        setUserLikedPosts(userNewLikedPosts)
    }

    const handleDislikes = () => {
        try {
            toggleDislikePost(sessionStorage.token, postId)
                .then(() => {
                    if (userDislikedPosts.includes(postId)) {
                        setDislikes(dislikes - 1)

                        deleteUserDislikedPost()
                    } else {
                        setDislikes(dislikes + 1)

                        addUserDislikedPost()

                        if (userLikedPosts.includes(postId)) {
                            setLikes(likes - 1)

                            deleteUserLikedPost()
                        }
                    }
                })
                .catch(error => {
                    setFeedback({ level: 'error', message: error.message })
                })
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    const handleLikes = () => {
        try {
            toggleLikePost(sessionStorage.token, postId)
                .then(() => {
                    if (userLikedPosts.includes(postId)) {
                        setLikes(likes - 1)

                        deleteUserLikedPost()
                    } else {
                        setLikes(likes + 1)

                        addUserLikedPost()
                        if (userDislikedPosts.includes(postId)) {
                            setDislikes(dislikes - 1)

                            deleteUserDislikedPost()
                        }
                    }
                })
                .catch(error => {
                    setFeedback({ level: 'error', message: error.message })
                })
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    const handleSavePosts = () => {
        try {
            toggleSavePost(sessionStorage.token, postId)
                .then(() => {
                    if (location.pathname === '/my-saved-posts') {
                        handleUnsavePost()
                    }

                    setPostSaved(!postSaved)
                })
                .catch(error => {
                    setFeedback({ level: 'error', message: error.message })
                })
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    const handleDeletePost = () => {
        try {
            deletePost(sessionStorage.token, postId)
                .then(() => {
                    handlePostDeleted()
                })
                .catch(error => {
                    setFeedback({ level: 'error', message: error.message })
                })
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    const onComments = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const handleNewComments = () => {
        setNewComment(!newComment)
    }

    return < >
        {post ? <div className="Post">
            <div className="Post__header">
                <div className="Post__header_userInfo">
                    <div className="Post__header_userInfo-image">
                        <img src={post.userImage ?? "./images/profile.png"} alt="userImage" />
                    </div>
                    <p>{post.userNickname}</p>
                </div>
                <p>{post.subject}</p>
            </div>
            <div className="Post__body">
                <h1 className="Post__body__title">{post.title}</h1>
                <div className="Post__body__container">
                    <img className="Post__body__image" src={post.image} />
                    <div className="Post__body__container-description">
                        <p className="Post__body__description">{post.description}</p>
                        <p className="Post__body__address">{post.address ? `Address: ${post.address}` : null}</p>
                        <time className="Post__body__date">{post.date}</time>
                        <p className='Post__body__comments' onClick={onComments}>Comments ({comments.length})</p>
                    </div>
                </div>
            </div>
            {location.pathname === '/my-posts' && <div className='Post__footer Post__footer--center'>
                <button className='Post__footer__button' onClick={handleDeletePost}><img src="./images/deleteIcon.png" alt="userImage" /></button>
            </div>}
            {location.pathname !== '/my-posts' && <div className="Post__footer">
                <div className="Post__footer Post__footer-container">
                    <div className="Post__footer-feedback">
                        <div className="Post__footer-feedback Post__footer-feedback__likes">
                            <button className='Post__footer__button' onClick={handleLikes}><img src="./images/likesIcon.png" alt="likes" /></button>
                            {
                                likes ? <p>({likes})</p> : <p>(0)</p>
                            }
                        </div>
                        <div className="Post__footer-feedback Post__footer-feedback__dislikes">
                            <button className='Post__footer__button ' onClick={handleDislikes}><img src="./images/dislikesIcon.png" alt="dislikes" /></button>
                            {
                                dislikes ? <p>({dislikes})</p> : <p>(0)</p>
                            }
                        </div>
                    </div>
                    <button className='Post__footer__button Post__footer__button-save' onClick={handleSavePosts}><img src={postSaved ? "./images/savedIcon.png" : "./images/unsavedIcon.png"} /></button>
                </div>
            </div>}
        </div> :
            null}

        {modalOpen && <Modal handleCloseModal={handleCloseModal} content={<PostComments handleCloseModal={handleCloseModal} postId={postId} comments={comments} handleNewComments={handleNewComments} />} />}
    </>
}