import { registerCompany } from '../logic'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Context from './Context'

export default function ({ onRegistered }) {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)

    const register = event => {
        event.preventDefault()

        const { target: { businessName: { value: businessName }, cif: { value: cif }, name: { value: name }, email: { value: email }, password: { value: password } } } = event

        try {
            registerCompany(businessName, cif, name, email, password)
                .then(() => {
                    setFeedback({level: 'info', message: 'Bienvenido'})

                    onRegistered()
                })
                .catch(error => setFeedback({level: 'error', message: error.message}))
        } catch (error) {
            setFeedback({level: 'error', message: error.message})
        }
    }

    return <form className="login login__form" onSubmit={register}>
        <input className="login__input" type="text" name="businessName" placeholder="Introduce el nombre de la empresa" />
        <input className="login__input" type="text" name="cif" placeholder="Introduce el cif" />
        <input className="login__input" type="text" name="name" placeholder="Introduce tu nombre" />
        <input className="login__input" type="email" name="email" placeholder="Introduce tu correo electrónico" />
        <input className="login__input" type="password" name="password" placeholder="Elige una contraseña" />
        <button className="login__button">Registrate</button>
        <p>Ya tienes cuenta,<a onClick={() => navigate('/')}> inicia sesión</a></p>
    </form>
}
