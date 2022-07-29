import './App.css';
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Landing from "./Landing";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { validators } from 'commons'
import Context from './Context'
import Feedback from './Feedback'
import Menu from "./Menu";

const { validateToken } = validators

export default function () {
    const navigate = useNavigate()
    const [feedback, setFeedback] = useState({ level: 'info', message: null })
    const [userName, setUserName] = useState()
    try {
        validateToken(sessionStorage.token)
      } catch (error) {
        delete sessionStorage.token
      } 
    const { token } = sessionStorage
    const [loggedIn, setLoggedIn] = useState(!!token)
    

    const handleLoggedOut = () => {
        setLoggedIn(false)
    }
    const handleLoggedIn = (username) => {
        setUserName(username)
        setLoggedIn(true)
        navigate('/')
    }

    const handleRegistered = () => { navigate(`/login`)}

    const clearFeedback = () => setFeedback({ message: null })


    return <Context.Provider value={{ setFeedback }}>
        {feedback.message && <Feedback level={feedback.level} message={feedback.message} onTimeout={clearFeedback} />}
        <Routes> 
            <Route path="/*" element={loggedIn ? <Home onLoggedOut={handleLoggedOut}  /> : <Landing />} />
            <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register onRegistered={handleRegistered} />} />
            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login onLogged={username=>handleLoggedIn(username)} />} />
            <Route path="/menu/:username" element={<Menu username={userName}/>} />   
        </Routes>
    </Context.Provider>
}