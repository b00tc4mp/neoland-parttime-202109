import { useNavigate } from "react-router-dom"
import './Landing.css'

export default function () {
    const navigate = useNavigate()

    return <div className="landing">
        <h1 className="landing__name">🚀 NAME APP</h1>

        <h2 className="landing__title">El software para la gestión su flota</h2>
        <p className="landing__presentation">Herramienta en la nube para poder gestionar con agilidad el tratamiento de los partes de daño de tu flota</p>
        <button className="landing__button" onClick={() => navigate("/register")}>Empieza ahora</button>
        <p>Si ya tienes sesión, <a onClick={() => navigate("/login")}>inicia sesión aquí</a></p>

    </div>
} 