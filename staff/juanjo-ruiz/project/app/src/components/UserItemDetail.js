import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import './UserItemDetail.css'

export default function ({ content }) {
    const navigate = useNavigate()
    const [state, setState] = useState()

    useEffect(() => {
        if (content.active === true) {
            setState('Activo')
        } else {
            setState('Desactivado')
        }
    }, [])
    
    return <div className="userItem">
        <h3>ID</h3>
        <p>{content.businessId}</p>
        <h3>Nombre</h3>
        <p>{content.name}</p>
        <h3>Email</h3>
        <p>{content.email}</p>
        <h3>Teléfono</h3>
        <p>{content.phone}</p>
        {/* <h3>Fecha de antigüedad</h3>       
        <p>{content.newDischargeDate}</p> */}
        <h3>Fecha de alta</h3>
        <time>{content.newDate}</time>
        <h3>Role en la compañia</h3>
        <p>{content.role}</p>
        <h3>Estado</h3>
        <p>{state}</p>
        <button className="userItem__Button" onClick={() => navigate(`/user/${content.id}/update`)}>Editar usuario</button>
        <button className="userItem__Button" onClick={() => navigate(`/user/${content.id}/delete`)}>Eliminar usuario</button>
    </div>
}