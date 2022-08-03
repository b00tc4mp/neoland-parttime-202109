import { deleteVehicle } from '../logic'
import { useParams, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Context from './Context'
import './DeleteVehicle.css'

export default function () {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)
    const { vehicleId } = useParams()

    const remove = event => {
        event.preventDefault()

        const { target: { password: { value: password } } } = event

        try {
            deleteVehicle(sessionStorage.token, vehicleId, password)
                .then(() => {
                    setFeedback({ level: 'info', message: 'vehículo eliminado' })

                    navigate('/vehicles')
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }


    return <div>
        <a onClick={() => navigate(`/vehicle/${vehicleId}`)}>Volver</a>
        <div className="deleteVehicle">
            <form className="deleteVehicle__form" onSubmit={remove}>
                <input className="deleteVehicle__input" type="password" name="password" placeholder="Contraseña" />
                <button className="deleteVehicle__button">Eliminar</button>
            </form>
        </div>
    </div>
}