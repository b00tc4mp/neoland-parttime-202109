import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { retrieveVehicle } from "../logic"
import VehicleItemDetail from './VehicleItemDetail'
import Context from "./Context"

export default function () {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)
    const { vehicleId } = useParams()
    const [vehicle, setVehicle] = useState()

    useEffect(() => {
        try {
            retrieveVehicle(sessionStorage.token, vehicleId)
                .then(vehicle => {
                    setVehicle(vehicle)
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }, [])

    const handleDetailView = (vehicleId, viewId) => navigate(`/vehicle/${vehicleId}/view/${viewId}`)

    return <div>
        <a onClick={() => navigate('/vehicles')}>Volver</a>

        {vehicle ? <VehicleItemDetail content={vehicle} onDetailView={handleDetailView} /> : <p>Vehículo no encontrado</p>}

    </div>
}