import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { retrieveView } from "../logic"
import ViewItemDetail from './ViewItemDetail'
import Context from "./Context"

export default function () {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)
    const { vehicleId, viewId } = useParams()
    const [view, setView] = useState()

    useEffect(() => {
        try {
            retrieveView(sessionStorage.token, vehicleId, viewId)
                .then(image => {
                    setView(image)
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }, [])

    return <div>
        <a onClick={() => navigate(`/vehicle/${vehicleId}`)}>Volver</a>

        {view ? <ViewItemDetail content={view} /> : <p>Vista no encontrada</p>}

    </div>
}