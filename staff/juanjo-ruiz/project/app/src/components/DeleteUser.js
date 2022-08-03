import { deleteUser } from '../logic'
import { useParams, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Context from './Context'
import './DeleteUser.css'

export default function () {
    const { setFeedback } = useContext(Context)
    const navigate = useNavigate()

    const { userId } = useParams()

    const remove = event => {
        event.preventDefault()

        const { target: { password: { value: password } } } = event

        try {
            deleteUser(sessionStorage.token, userId, password)
                .then(() => {
                    setFeedback({ level: 'info', message: 'usuario eliminado' })

                    navigate('/users')
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }


    return <div>
        <a onClick={() => navigate(`/user/${userId}`)}>Volver</a>
        <div className="deleteUser">
        <form className="deleteUser__form" onSubmit={remove}>
            <input className="deleteUser__input" type="password" name="password" placeholder="Contraseña" />
            <button className="deleteUser__button">Eliminar</button>
        </form>
        </div>
    </div>
}