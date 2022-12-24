import './Home.css'
import { useState, useEffect } from 'react'
import { useLocation, Routes, Route, useNavigate } from 'react-router-dom';
import { retrieveUser } from '../logic'
import Quiz from './Quiz'
import Feed from './Feed'
import UserPosts from './UserPosts'
import Modal from './Modal'
import NewPost from './NewPost'
import UserSavedPosts from './UserSavedPosts'
import SubjectSelector from './SubjectSelector'
import CategorySelector from './CategorySelector'
import UserMenu from './UserMenu';
import Unregister from './Unregister'
import UserConfigurations from './UserConfigurations';
import { useContext } from 'react'
import Context from './Context'

function Home({ onLoggedOut }) {
    const navigate = useNavigate()
    const location = useLocation()
    const { setFeedback } = useContext(Context)

    const [modalOpen, setModalOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [postCreated, setPostCreated] = useState(false)
    const [user, setUser] = useState()
    const [subject, setSubject] = useState()
    const [category, setCategory] = useState()
    const [quizPassed, setQuizPassed] = useState(false)

    const loadUser = () => {
        try {
            retrieveUser(sessionStorage.token)
                .then(user => {
                    setUser(user)
                    setQuizPassed(user.quizPassed)
                })
                .catch(error => {
                    logOut()

                    setFeedback({ level: 'error', message: error.message })
                })
        } catch (error) {
            logOut()

            setFeedback({ level: 'error', message: error.message })
        }
    }

    useEffect(() => {
        loadUser()
    }, [refresh, category, subject])

    const logOut = () => {
        delete sessionStorage.token

        onLoggedOut()
    }

    const handleQuizPassed = () => setQuizPassed(true)

    const onSubjectSelected = subject => {
        setSubject(subject)
    }

    const onCategorySelected = category => {
        setCategory(category)
    }

    const handleMyPosts = () => {
        setRefresh(!refresh)

        navigate('/my-posts')
    }

    const handleSavedPosts = () => {
        setRefresh(!refresh)

        navigate('/my-saved-posts')
    }

    const handleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const comeBack = () => {
        if (location.pathname === '/unregister') {
            setRefresh(!refresh)
            navigate(-1)
        }
        else if (location.pathname === '/my-posts' || '/my-saved-posts') {
            setRefresh(!refresh)
            navigate('/')
        }
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const handleOpenModal = () => {
        setModalOpen(true)
    }

    const handlePostCreated = () => {
        setPostCreated(!postCreated)
    }

    const handleRefresh = () => {
        setRefresh(!refresh)
    }

    const isNotInUnregisterOrConfiguration = location.pathname !== '/unregister' && location.pathname !== '/configurations'
    const appliedSubjectText = subject ? `${subject}`.charAt(0).toUpperCase() + `${subject}`.slice(1) : 'All'

    return <div className='Home'>
        {user && quizPassed && <div>
            <div className='Home__header'>

                {location.pathname === '/' && <div className='Home__header__top'>
                    <img className='Home__logo' src="./images/appLogo.png" alt='app-logo' />
                    <h2 className='Home__header__subject-filter-text'>{appliedSubjectText}</h2>
                    <div className="Home__header__top Home__header__top--noBorder">
                        <div className="Home__header__top-user-image">
                            <img src={user?.image?? "./images/profile.png"} alt="userImage" onClick={handleMyPosts} />
                        </div>
                        <button className="Home__header__top__button" onClick={logOut} ><img src="./images/logoutImg.png" /></button>
                    </div >
                </div>}

                {location.pathname !== '/' && <div className='Home__header__top Home__header_top-userSection'>
                        <div className="Home__header__top-user-image">
                            <img src={user?.image?? "./images/profile.png"} alt="userImage" onClick={handleMenu} />
                        </div>
                    {isNotInUnregisterOrConfiguration && <h2 className='Home__header__subject-filter-text'>{appliedSubjectText}</h2>}
                    <div>
                        <button className="Home__header__top__button Home__header__top__button-comeback" onClick={comeBack}><img src="./images/comeBackImg.png" /></button>
                    </div >
                </div>}
                {isNotInUnregisterOrConfiguration && <SubjectSelector onSubjectSelected={onSubjectSelected} />}
            </div>

            {isNotInUnregisterOrConfiguration && <div className='Home__body'>
                <Routes>
                    <Route path="/*" element={<Feed category={category} subject={subject} user={user} postCreated={postCreated} logOut={logOut} />} />
                    <Route path="/my-posts/*" element={<UserPosts category={category} subject={subject} user={user} postCreated={postCreated} logOut={logOut} />} />
                    <Route path="/my-saved-posts/*" element={<UserSavedPosts category={category} subject={subject} user={user} postCreated={postCreated} logOut={logOut} />} />
                </Routes>
            </div>}
            {isNotInUnregisterOrConfiguration && <div className='Home__footer'>
                <CategorySelector onCategorySelected={onCategorySelected} />
                <div className='Home__button-addPost_container'>
                <button className='Home__button-addPost' onClick={handleOpenModal}><p>+</p></button>
                </div>       
            </div>}
        </div>}

        {user && !quizPassed && <Quiz onQuizPassed={handleQuizPassed} />}

        {modalOpen && <Modal handleCloseModal={handleCloseModal} content={<NewPost handleCloseModal={handleCloseModal} handlePostCreated={handlePostCreated} />} />}

        <UserMenu menuOpen={menuOpen} handleSavedPosts={handleSavedPosts} handleMenu={handleMenu} handleMyPosts={handleMyPosts} onLoggedOut={logOut} user={user}/>

        <Routes>
            <Route path="/unregister/*" element={<Unregister logOut={logOut} />} />
            <Route path="/configurations/*" element={<UserConfigurations user={user} logOut={logOut} handleRefresh={handleRefresh} />} />
        </Routes>

    </div>
}

export default Home