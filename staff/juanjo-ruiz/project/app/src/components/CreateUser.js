import { createUser } from "../logic"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import Context from "./Context"
import './CreateUser.css'

export default function () {
    const { setFeedback } = useContext(Context)

    const navigate = useNavigate()

    const newUser = event => {
        event.preventDefault()

        const { target: { businessId: { value: businessId }, name: { value: name }, email: { value: email }, password: { value: password }, phone: { value: phone }, dischargeDate: { value: dischargeDate }, role: { value: role } } } = event

        try {
            createUser(sessionStorage.token, businessId, name, email, password, phone, dischargeDate, role)
                .then(() => {
                    setFeedback({ level: 'info', message: 'usuario creado' })

                    navigate('/users')
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <div>
        <a onClick={() => navigate('/users')}>Volver</a>
        <div className="createUser">
        <h2>Nuevo usuario</h2>
        <form className="createUser__form" onSubmit={newUser}>
            <input className="createUser__input" type="name" name="businessId" placeholder="id driver" required />
            <input className="createUser__input" type="name" name="name" placeholder="nombre" required />
            <input className="createUser__input" type="email" name="email" placeholder="correo electrónico" required />
            <input className="createUser__input" type="password" name="password" placeholder="contraseña" required />
            <input className="createUser__input" type="number" name="phone" placeholder="número de teléfono" />
            <input className="createUser__input" type="date" name="dischargeDate" required />
            <select className="createUser__select" name="role">
                <option value="driver">driver</option>
                <option value="admin">admin</option>
                <option value="owner">owner</option>
            </select>
            <button className="createUser__button">Crear usuario</button>
        </form>
        </div>
    </div>
}