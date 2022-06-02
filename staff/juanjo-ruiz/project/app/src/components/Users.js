import { retrieveAllUsers } from '../logic'
import { useState, useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import UserItem from './UserItem'
import CreateUser from './CreateUser'

export default function () {
    const [users, setUsers] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        try {
            retrieveAllUsers(sessionStorage.token)
                .then(users => setUsers(users))
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])


    return <div>
        <a onClick={() => navigate('/')}>Volver</a>
        <h2>USUARIOS</h2>
        {
            users ?
                <ul>
                    {users.map(user => <li key={user.id}>
                        <UserItem content={user} />
                    </li>)}
                </ul>
                : <p>no hay usuarios</p>
        }
        <a onClick={() => navigate('/user')}>añadir usuario</a> {/* añadir icono */}
    </div>
}