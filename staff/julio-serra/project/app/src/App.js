import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Register from './components/Register';
import Landing from './components/Landing';
import Login from './components/Login';
import { validateToken } from 'commons';
import './index.css';


export default function App() {

  const navigate = useNavigate()
  const { token } = sessionStorage

  try {
    validateToken(sessionStorage.token)
  } catch (error) {
    delete sessionStorage.token
  }

  const [loggedIn, setLoggedIn] = useState(!!token) //para convertirlo a booleano lo negamos 2 veces

  const handleLoggedIn = () => {
    setLoggedIn(true)
    navigate('/')
  }


  return (
    <>
      <Routes>
        <Route path='/*' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={loggedIn ? <Navigate to="/" /> : <Login onloggedIn={handleLoggedIn} />} />
      </Routes>
    </>
  );
}

