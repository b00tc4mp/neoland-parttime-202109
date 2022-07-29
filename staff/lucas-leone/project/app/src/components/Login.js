import './Login.css'
import { authenticateUser } from "../logic"
import { useContext } from 'react'
import Context from './Context'
import logo from '../logo_primary.png'

export default function ({ onLogged }) {
    const { setFeedback } = useContext(Context)
    const login = event => {
        event.preventDefault()

        const { target: { username: { value: username }, password: { value: password } } } = event

        try {
            authenticateUser(username, password)
                .then(token => {
                    sessionStorage.token = token
                    onLogged(username)
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))

        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <div className='Login'>
        <img className='Login__image' src={logo} alt="logo"/>
        <form className="Login__form" onSubmit={login}>
            <input className='Login__input' type='text' name='username' placeholder='username' />
            <input className='Login__input' type='password' name='password' placeholder='password' />
            <button className='Login__submit'>Login</button>
            <div className='Login__register'><span className='Login__account'>don't have an account?</span><a className='Login__goRegister' href="/Register">Register</a></div>
        </form>
    </div>

}
