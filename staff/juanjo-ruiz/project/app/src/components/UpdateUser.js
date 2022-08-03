import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { retrieveUser, updateUser } from "../logic"
import Context from "./Context"
import './UpdateUser.css'

export default function () {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)
    const [data, setData] = useState()
    const { userId } = useParams()

    useEffect(() => {
        try {
            retrieveUser(sessionStorage.token, userId)
                .then(user => {
                    setData(user)
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }, [])

    const update = event => {
        event.preventDefault()

        const { target: { name: { value: name }, email: { value: email }, role: { value: role } } } = event

        try {
            updateUser(sessionStorage.token, userId, name, email, role)
                .then(() => {
                    setFeedback({ level: 'info', message: 'usuario actualizado' })

                    navigate('/users')
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <div className="updateUser">
        <a onClick={() => navigate(`/user/${userId}`)}>Volver</a>
        {data ?
            <form className="updateUser__form" onSubmit={update}>
                <input className="updateUser__input" type="name" name="name" defaultValue={data.name} />
                <input className="updateUser__input" type="email" name="email" defaultValue={data.email} />
                <select className="updateUser__select" name="role" defaultValue={data.role}>
                    <option value="driver">driver</option>
                    <option value="admin">admin</option>
                    <option value="owner">owner</option>
                </select>
                <button className="updateUser__button">Actualizar</button>
            </form>
            : <p>No hay dato</p>
        }
    </div>
}