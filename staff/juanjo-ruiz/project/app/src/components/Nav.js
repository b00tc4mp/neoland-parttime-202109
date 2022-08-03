import { useNavigate } from "react-router-dom"
import './Nav.css'

export default function () {
    const navigate = useNavigate()

    return <div className="nav">
        <button className="nav__button" onClick={() => navigate('/vehicles')}>Vehículos</button>
        <button className="nav__button" onClick={() => navigate('/users')}>Usuarios</button>
    </div>
}