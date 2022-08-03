import { retrieveAllUsers, findUsers } from '../logic'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserItem from './UserItem'
import Context from './Context'
import './Users.css'

export default function ({ onDetailUser }) {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)
    const [users, setUsers] = useState()
    const [results, setResults] = useState()
    const [controls, setControls] = useState()

    useEffect(() => {
        try {
            retrieveAllUsers(sessionStorage.token)
                .then(users => setUsers(users))
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }, [])

    const search = event => {
        event.preventDefault()

        const { target: { q: { value: query } } } = event

        try {
            findUsers(sessionStorage.token, query)
                .then(results => {
                    setResults(results)
                    setControls(true)
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    const handleButton = () => {
        results.length ?
            setControls(false)
            : navigate('/')
    }

    const handleDetailUser = id => onDetailUser(id)

    return <div>
        <a onClick={handleButton}>Volver</a>
        <h2 className="users__title">USUARIOS</h2>
        <form onSubmit={search}>
            <label className="users__label">Buscador de usuarios</label>
            <input className="users__input" type="search" name="q" required />
            <button className="users__button__search">🔎</button>
        </form>
        <div>
            {controls ?
                results.length ?
                    <ul>
                        {results.map(result => <li key={result.id} onClick={() => handleDetailUser(result.id)} >
                            <UserItem content={result} />
                        </li>)}
                    </ul>
                    :
                    <p>no hay usuarios con este nombre</p>
                :
                users ?
                    <ul>
                        {users.map(user => <li key={user.id} onClick={() => handleDetailUser(user.id)} >
                            <UserItem content={user} />
                        </li>)}
                    </ul>
                    : <p>no hay usuarios</p>
            }
        </div>
        <button className="users__button" onClick={() => navigate('/user')}>añadir usuario nuevo</button> {/* añadir icono */}
    </div>
}