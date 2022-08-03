import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { retrieveAllParts } from '../logic'
import Context from "./Context"
import PartItem from './PartItem'
import CreatePart from "./CreatePart"
import './ViewItemDetail.css'

export default function ({ content }) {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)
    const { vehicleId, viewId } = useParams()
    const [parts, setParts] = useState()
    const [addPart, setAddPart] = useState()
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

    useEffect(() => {
        try {
            retrieveAllParts(sessionStorage.token, vehicleId)
                .then(items => {
                    let parts = items.filter(item => item.side === content.title)
                    setParts(parts)
                    setAddPart(false)
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }, [])

    const handleCreatePart = event => {
        event.preventDefault()

        const asisX = event.clientX
        const asisY = event.clientY

        setCoordinates({ x: asisX, y: asisY })
        setAddPart(true)
    }
console.log(parts)
    const handleDetailPart = (vehicleId, partId) => navigate(`/vehicle/${vehicleId}/view/${viewId}/part/${partId}`)

    return <div>
        {addPart ?
            <CreatePart coordinates={coordinates} title={content.title} />
            :
            <div className="viewItemDetail">
                <img src={content.image} onClick={handleCreatePart} />
                <h3 className="viewItemDetail__title">Partes</h3>
                {parts ?
                    <ul>
                        {parts.map(part => <li className="viewItemDetail__li" key={part.id} onClick={() => handleDetailPart(vehicleId, part.id)}>
                                <PartItem content={part} />
                            </li>)}
                    </ul>
                    : <p>No hay partes abiertos</p>
                }
            </div>
        }
    </div >
}