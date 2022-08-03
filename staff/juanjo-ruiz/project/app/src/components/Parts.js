import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from 'react'
import { retrieveAllParts } from "../logic"
import PartItem from "./PartItem"
import Context from "./Context"
import './Parts.css'

export default function ({ onDetailPart }) {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)
    const { vehicleId } = useParams()

    const [parts, setParts] = useState()

    useEffect(() => {
        try {
            retrieveAllParts(sessionStorage.token, vehicleId)
                .then(parts => setParts(parts))
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }, [])

    const handleDatailPart = (vehicleId, partId) => onDetailPart(vehicleId, partId)

    return <div>
        <a onClick={() => navigate(`/vehicle/${vehicleId}`)}>Volver</a>
        <h3>Partes</h3>
        {
            parts ?
                <ul>
                    {parts.map(part => <li className="part__li" key={part.id} onClick={() => handleDatailPart(vehicleId, part.id)}>
                        <PartItem content={part} />
                    </li>)}
                </ul>
                : <p>No hay partes</p>
        }
    </div>
}