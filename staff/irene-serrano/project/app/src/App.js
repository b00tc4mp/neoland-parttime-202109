import './App.css';
import Landing from './components/Landing'
import RegisterDeveloper from './components/RegisterDeveloper'
import RegisterCompany from './components/RegisterCompany'
import Header from './components/Header';

import Login from './components/Login'
import Home from './components/Home'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { validators } from 'commons'

const { validateToken } = validators

function App() {
  const { token } = sessionStorage
  const navigate = useNavigate()

  const [loggedIn, setLoggedIn] = useState(!!token)
  const handleLoggedOut = () => setLoggedIn(false)
  const handleLoggedIn = () => {
    setLoggedIn(true)
    navigate('/')
  }
  return <div className='App'>
    <Header/>
    <Routes>
      <Route path="/*" element={loggedIn ? <Home onLoggedOut={handleLoggedOut} /> : <Landing />} />

      <Route path="/registerDeveloper" element={loggedIn ? <Navigate to="/" /> : <RegisterDeveloper onRegistered={handleLoggedIn} />} />
      <Route path="/registerCompany" element={loggedIn ? <Navigate to="/" /> : <RegisterCompany onRegistered={handleLoggedIn} />} />

      <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login onLoggedIn={handleLoggedIn} />} />
    </Routes>

  </div>
}

export default App;
