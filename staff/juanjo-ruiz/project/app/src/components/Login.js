import { authenticateUser } from "../logic"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import Context from "./Context"
import './Login.css'

export default function ({ onLoggedIn }) {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)

    const login = event => {
        event.preventDefault()

        const { target: { email: { value: email }, password: { value: password } } } = event

        try {
            authenticateUser(email, password)
                .then(token => {
                    sessionStorage.token = token

                    onLoggedIn()
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <div className="login">
        <h2>Accede a tu cuenta</h2>
        <form className="login__form" onSubmit={login}>
            <input className="login__input" type="email" name="email" placeholder="Introduce tu correo electrónico" />
            <input className="login__input" type="password" name="password" placeholder="Introduce tu contraseña" />
            <button className="login__button">Inicia sesión</button>
        </form>
            <p>Aún no estas registrado,<a onClick={() => navigate("/register")}>hazlo aquí</a></p>
    </div>
}