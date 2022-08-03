import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { retrievePart } from "../logic"
import PartItemDetail from './PartItemDetail'
import Context from "./Context"

export default function () {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)
    const { vehicleId, viewId, partId } = useParams()
    const [part, setPart] = useState()

    useEffect(() => {
        try {
            retrievePart(sessionStorage.token, vehicleId, partId)
                .then(part => {
                    setPart(part)
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }, [])

    return <div>
        <a onClick={() => navigate(`/vehicle/${vehicleId}/view/${viewId}`)}>Volver</a>

        {part ? <PartItemDetail content={part} /> : <p>Parte no encontrado</p>}

    </div>
}