import './Home.css'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { retrieveUser, retrieveAllPosts, retrievePostsBy } from '../logic'
import Quiz from './Quiz'
import Post from './Post'
import SubjectSelector from './SubjectSelector'
import { errors } from 'commons'
import CategorySelector from './CategorySelector'
import UserSection from './UserSection'
const { AuthError } = errors

function Home({ onLoggedOut }) {
    const [user, setUser] = useState()
    const [posts, setPosts] = useState([])
    const [category, setCategory] = useState()
    const [subject, setSubject] = useState()
    const [quizPassed, setQuizPassed] = useState(false)

    const navigate = useNavigate()

    const loadUser = () => {
        try {
            retrieveUser(sessionStorage.token)
                .then(user => {
                    setUser(user)
                    setQuizPassed(user.quizPassed)
                })
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

    const loadPosts = () => {
        try {
            retrieveAllPosts(sessionStorage.token)
                .then(posts => {
                    setPosts(posts)
                })
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

    const loadPostsBy = () => {
        try {
            retrievePostsBy(sessionStorage.token, category, subject)
                .then(posts => {
                    setPosts(posts)
                })
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

    const loadFilterPosts = () => {
        if (category || subject) {
            loadPostsBy()
        }
        else {
            loadPosts()
        }
    }

    useEffect(() => {
        loadUser()
    }, [])

    useEffect(() => {
        loadFilterPosts()
    }, [category, subject])

    const logOut = () => {
        delete sessionStorage.token

        onLoggedOut()
    }

    const handleQuizPassed = () => setQuizPassed(true)

    const handleSubject = subject => {
        setSubject(subject)
    }

    const handleCategory = category => {
        setCategory(category)
    }

    const appliedSubjectText = subject ? `${subject}`.charAt(0).toUpperCase() + `${subject}`.slice(1) : 'All'

    return <div className='home'>
        {user && quizPassed && <div>
            <div className='home__header'>
                <h1>Logo</h1>
                <h2 className='home__header-filterText'>{appliedSubjectText}</h2>
                <div>
                    <h2>{user.nickname}</h2>
                    <button onClick={logOut}>LogOut</button>
                </div >
            </div>
            <div className='home__body'>
                <SubjectSelector onSelectedSubject={handleSubject} />
                {
                    posts.length ?
                        <ul> {posts.map(post => <li key={post.id}> <Post post={post} user={user} /></li>)}
                        </ul> :
                        <p>Sorry, there are no posts to show</p>
                }
            </div>
            <div className='home__footer'>
                <CategorySelector onSelectedCategory={handleCategory} />
                <button className='home__button--addPost'>+</button>
            </div>
        </div>}
        {user && !quizPassed && <Quiz onQuizPassed={handleQuizPassed} />}
    </div>
}

export default Home