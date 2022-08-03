import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { retrieveVehicle, updateVehicle } from "../logic"
import Context from "./Context"
import './UpdateVehicle.css'

export default function () {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)
    const [data, setData] = useState()
    const { vehicleId } = useParams()

    useEffect(() => {
        try {
            retrieveVehicle(sessionStorage.token, vehicleId)
                .then(vehicle => {
                    setData(vehicle)
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }, [])

    const update = event => {
        event.preventDefault()

        const { target: { lisense: { value: lisense }, brand: { value: brand }, model: { value: model }, frame: { value: frame } } } = event

        try {
            updateVehicle(sessionStorage.token, vehicleId, lisense, brand, model, frame)
                .then(() => {
                    setFeedback({ level: 'info', error: 'vehículo actualizado' })

                    navigate('/vehicles')
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <div className="updateVehicle">
        <a onClick={() => navigate(`/vehicle/${vehicleId}`)}>Volver</a>
        {data ?
            <form className="updateVehicle__form" onSubmit={update}>
                <input className="updateVehicle__input" type="name" name="lisense" defaultValue={data.lisense} />
                <input className="updateVehicle__input" type="name" name="brand" defaultValue={data.brand} />
                <input className="updateVehicle__input" type="name" name="model" defaultValue={data.model} />
                <input className="updateVehicle__input" type="name" name="frame" defaultValue={data.frame} />
                <button className="updateVehicle__button">Actualizar</button>
            </form>
            : <p>No hay dato</p>
        }
    </div>
}