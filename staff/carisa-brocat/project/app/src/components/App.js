import Register from './Register';
import Home from './Home';
import Login from './Login';
import Landing from './Landing';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { validators } from 'commons';
import Context from './Context';
import Feedback from './Feedback'

const { validateToken } = validators

function App() {
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState({ level: 'info', message: null })

  try {
    validateToken(sessionStorage.token)
  } catch (error) {
    delete sessionStorage.token
  }

  const { token } = sessionStorage

  const [loggedIn, setLoggedIn] = useState(!!token)

  const handleRegistered = () => navigate('/login')

  const handleLogIn = () => {
    setLoggedIn(true)

    navigate('/')
  }

  const handleLogOut = () => {
    setLoggedIn(false)

    navigate('/login')
  }

  const clearFeedback = () => setFeedback({ message: null })

  return <Context.Provider value={{ setFeedback }}>
  {feedback.message && <Feedback level={feedback.level} message={feedback.message} onTimeout={clearFeedback} />}
  <Routes>
    <Route path="*" element={loggedIn ? <Home onLoggedOut={handleLogOut} /> : <Landing />} />
    <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register onRegistered={handleRegistered} />} />
    <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login onLoggedIn={handleLogIn} />} />
  </Routes>
  </Context.Provider>
}

export default App;
