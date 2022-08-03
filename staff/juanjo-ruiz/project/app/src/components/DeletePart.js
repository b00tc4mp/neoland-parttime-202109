import { deletePart } from '../logic'
import { useParams, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Context from './Context'
import './DeletePart.css'

export default function () {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)

    const { vehicleId, partId } = useParams()

    const remove = event => {
        event.preventDefault()

        const { target: { password: { value: password } } } = event

        try {
            deletePart(sessionStorage.token, vehicleId, partId, password)
                .then(() => {
                    setFeedback({ level: 'info', message: 'parte eliminado' })

                    navigate(`/vehicle/${vehicleId}/parts`)
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }


    return <div>
        <a onClick={() => navigate(`/vehicle/${vehicleId}/part/${partId}`)}>Volver</a>
        <div className="deletePart">
            <form className="deletePart__form" onSubmit={remove}>
                <input className="deletePart__input" type="password" name="password" placeholder="Contraseña" />
                <button className="deletePart__button">Eliminar</button>
            </form>
        </div>
    </div>
}