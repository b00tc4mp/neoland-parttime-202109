import { createVehicle } from "../logic"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import Context from "./Context"
import './CreateVehicle.css'

export default function () {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)

    const newVehicle = event => {
        event.preventDefault()

        const { target: { lisense: { value: lisense }, brand: { value: brand }, model: { value: model }, frame: { value: frame }, leasingCompany: { value: leasingCompany } } } = event

        try {
            createVehicle(sessionStorage.token, lisense, brand, model, frame, leasingCompany)
                .then(vehicle => navigate(`/vehicle/${vehicle._id}/views`))
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <div>
        <a onClick={() => navigate('/vehicles')}>Volver</a>
        <div className="createVehicle">
            <h2>Nuevo vehículo</h2>
            <form className="createVehicle__form" onSubmit={newVehicle}>
                <input className="createVehicle__input" type="name" name="lisense" placeholder="matrícula" required />
                <input className="createVehicle__input" type="name" name="brand" placeholder="marca" required />
                <input className="createVehicle__input" type="name" name="model" placeholder="modelo" required />
                <input className="createVehicle__input" type="name" name="frame" placeholder="número de bastidor" required />
                <input className="createVehicle__input" type="name" name="leasingCompany" placeholder="Renting propietaria" required />
                <button className="createVehicle__button" >Crear vehículo</button>
            </form>
        </div>
    </div>
}