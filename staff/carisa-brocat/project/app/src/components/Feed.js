import './Feed.css'
import { useState, useEffect } from 'react'
import { retrieveAllPosts, retrievePostsBy } from '../logic'
import Post from './Post'
import { useContext } from 'react'
import Context from './Context'

import { errors } from 'commons'
const { AuthError, NotFoundError } = errors

function Feed({ category, subject, user, postCreated }) {
    const { setFeedback } = useContext(Context)

    const [posts, setPosts] = useState([])

    const loadUserPosts = () => {
        try {
            retrieveAllPosts(sessionStorage.token)
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

    const loadUserPostsBy = () => {
        try {
            retrievePostsBy(sessionStorage.token, category, subject)
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
            loadUserPostsBy()
        }
        else {
            loadUserPosts()
        }
    }

    useEffect(() => {
        loadFilterPosts()
    }, [category, subject, postCreated])

    return <div className='Feed'>
        {
            posts.length ?
                <ul> {posts.map(post => <li key={post.id}> <Post postId={post.id} user={user} logOut /></li>)}
                </ul> :
                <div className='Feed__text'>
                    <p>Sorry, there are no posts to show</p>
                </div>

        }
    </div>
}

export default Feed