import { useNavigate, useParams } from "react-router-dom"
import './PartItemDetail.css'

export default function ({ content }) {
    const navigate = useNavigate()
    const { vehicleId, viewId } = useParams()

    return <div className="partItemDetail__content">
        <div className={`partItemDetail partItemDetail--${content.state}`}></div>
        <h3>Fecha de apertura</h3>
        <p>{content.newDate}</p>
        <h3>Descripción</h3>
        <p>{content.description}</p>
        <img src={content.image} />

        <button className="partItemDetail__button" onClick={() => navigate(`/vehicle/${vehicleId}/part/${content.id}/delete`)}>Eliminar parte</button>
        <button className="partItemDetail__button" onClick={() => navigate(`/vehicle/${vehicleId}/view/${viewId}/part/${content.id}/update`)}>Editar parte</button>
    </div>
}