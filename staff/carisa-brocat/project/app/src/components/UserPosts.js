import './UserPosts.css'
import { useState, useEffect } from 'react'
import { retrieveUserPosts, retrieveUserPostsBy } from '../logic'
import Post from './Post'
import { useContext } from 'react'
import Context from './Context'

import { errors } from 'commons'
const { AuthError, NotFoundError } = errors

function UserPosts({ category, subject, user, postCreated}) {
    const { setFeedback } = useContext(Context)

    const [posts, setPosts] = useState([])
    const [postDeleted, setPostDeleted] = useState(false)

    const loadUserPosts = () => {
        try {
            retrieveUserPosts(sessionStorage.token)
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

    const loadUserPostBy = () => {
        try {
            retrieveUserPostsBy(sessionStorage.token, category, subject)
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
            loadUserPostBy()
        }
        else {
            loadUserPosts()
        }
    }

    useEffect(() => {
        loadFilterPosts()
    }, [category, subject, postDeleted, postCreated])

    const handlePostDeleted = () => {
        setPostDeleted(!postDeleted)
    }

    return <div className='UserPosts'>
        {
            posts.length ?
                <ul> {posts.map(post => <li key={post.id}> <Post postId={post.id} user={user} handlePostDeleted={handlePostDeleted} logOut/></li>)}
                </ul> :
                <p className='UserPosts__text'>Sorry, there are no posts to show</p>
        }
    </div>
}

export default UserPosts