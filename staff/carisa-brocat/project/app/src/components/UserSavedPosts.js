import './UserSavedPosts.css'
import { useState, useEffect } from 'react'
import { retrieveUserSavedPosts, retrieveUserSavedPostsBy } from '../logic'
import { errors } from 'commons'
import Post from './Post'
import { useContext } from 'react'
import Context from './Context'

const { AuthError, NotFoundError } = errors

function UserSavedPosts({ category, subject, user, postCreated, logOut }) {
    const { setFeedback } = useContext(Context)

    const [posts, setPosts] = useState([])
    const [postUnsaved, setPostUnsaved] = useState(false)

    const loadUserSavedPosts = () => {
        try {
            retrieveUserSavedPosts(sessionStorage.token)
                .then(posts => {
                    setPosts(posts)
                })
                .catch(error => {
                    setFeedback({ level: 'error', message: error.message })
                })
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    const loadUserSavedPostBy = () => {
        try {
            retrieveUserSavedPostsBy(sessionStorage.token, category, subject)
                .then(posts => {
                    setPosts(posts)
                })
                .catch(error => {
                    setFeedback({ level: 'error', message: error.message })
                })
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    const loadFilterPosts = () => {
        if (category || subject) {
            loadUserSavedPostBy()
        }
        else {
            loadUserSavedPosts()
        }
    }

    useEffect(() => {
        loadFilterPosts()
    }, [category, subject, postCreated, postUnsaved])

    const handleUnsavePost = () => {
        setPostUnsaved(!postUnsaved)
    }


    return <div className='UserSavedPosts'>
        {
            posts.length ?
                <ul> {posts.map(post => <li key={post.id}> <Post postId={post.id} user={user} handleUnsavePost={handleUnsavePost} logOut/></li>)}
                </ul> :
                <p className='UserSavedPosts__text'>Sorry, there are no posts to show</p>
        }
    </div>
}

export default UserSavedPosts