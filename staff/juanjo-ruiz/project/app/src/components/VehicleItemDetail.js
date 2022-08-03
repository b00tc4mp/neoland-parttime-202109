import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import './VehicleItemDetail.css'

export default function ({ content, onDetailView }) {
    const navigate = useNavigate()
    const { vehicleId } = useParams()
    const [state, setState] = useState()
    const [part, setPart] = useState()

    useEffect(() => {
        if (content.active === true) {
            setState('Activo')
        } else {
            setState('Desactivado')
        }
    })

    useEffect(() => {
        if (!content.parts.length) {
            setPart(0)
        } else {
            setPart(content.parts.length)
        }
    }, [])

    const handleDetailView = (vehicleId, viewId) => onDetailView(vehicleId, viewId)

    return <div>
        {content.views.length ? <img src={content.views[0].image} onClick={() => handleDetailView(vehicleId, content.views[0]._id)} /> : <p>No hay foto</p>}
        {content.views.length ? <img src={content.views[1].image} onClick={() => handleDetailView(vehicleId, content.views[1]._id)} /> : <p>No hay foto</p>}
        {content.views.length ? <img src={content.views[2].image} onClick={() => handleDetailView(vehicleId, content.views[2]._id)} /> : <p>No hay foto</p>}
        {content.views.length ? <img src={content.views[3].image} onClick={() => handleDetailView(vehicleId, content.views[3]._id)} /> : <p>No hay foto</p>}
        <div className="vehicleItem">
            <h3>Matrícula</h3>
            <p>{content.lisense}</p>
            <h3>Marca</h3>
            <p>{content.brand}</p>
            <h3>Modelo</h3>
            <p>{content.model}</p>
            <h3>Número de bastidor</h3>
            <p>{content.frame}</p>
            <h3>Compañía de cesión</h3>
            <p>{content.leasingCompany}</p>
            <h3>Estado</h3>
            <p>{state}</p>
            <h3>Fecha de alta</h3>
            <time>{content.newDate}</time><br />
            <a onClick={() => navigate(`/vehicle/${content.id}/parts`)}>Partes abiertos: {part}</a> <br />
            <button className="vehicleItem__Button" onClick={() => navigate(`/vehicle/${content.id}/update`)}>Editar vehículo</button>
            <button className="vehicleItem__Button" onClick={() => navigate(`/vehicle/${content.id}/delete`)}>Eliminar vehículo</button>
        </div>
    </div>
}