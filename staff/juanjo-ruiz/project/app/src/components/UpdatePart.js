import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { retrievePart, updatePart } from "../logic"
import Context from "./Context"
import './UpdatePart.css'

export default function () {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)
    const [data, setData] = useState()
    const { vehicleId, viewId, partId } = useParams()

    useEffect(() => {
        try {
            retrievePart(sessionStorage.token, vehicleId, partId)
                .then(part => {
                    setData(part)
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }, [])

    const update = event => {
        event.preventDefault()

        const { target: { description: { value: description }, state: { value: state } } } = event

        try {
            updatePart(sessionStorage.token, vehicleId, partId, description, state)
                .then(() => {
                    setFeedback({ level: 'info', message: 'parte actualizado' })

                    navigate(`/vehicle/${vehicleId}/view/${viewId}`)
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <div className="updatePart">
        <a onClick={() => navigate(`/vehicle/${vehicleId}/view/${viewId}`)}>Volver</a>
        {data ?
            <form className="updatePart__form" onSubmit={update}>
                <textarea className="updatePart__textarea" type="name" name="description" defaultValue={data.description} />
                <select className="updatePart_select" name="state" defaultValue={data.state}>
                    <option value="2">Iniciado</option>
                    <option value="1">En proceso</option>
                    <option value="0">Gestionado</option>
                </select>
                <button className="updatePart__button">Actualizar</button>
            </form>
            : <p>No hay datos</p>
        }
    </div>
}