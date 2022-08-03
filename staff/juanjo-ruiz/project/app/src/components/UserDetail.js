import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { retrieveUser } from "../logic"
import UserItemDetail from './UserItemDetail'
import Context from "./Context"

export default function () {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)
    const { userId } = useParams()
    const [user, setUser] = useState()

    useEffect(() => {
        try {
            retrieveUser(sessionStorage.token, userId)
                .then(user => {
                    setUser(user)
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }, [])

    return <div>
        <a onClick={() => navigate('/users')}>Volver</a>

        {user ? <UserItemDetail content={user} /> : <p>Usuario no encontrado</p>}

    </div>
}