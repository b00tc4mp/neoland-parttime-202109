import './Login.css'
import { registerUser } from "../logic";
import { useContext } from 'react'
import Context from './Context'
import logo from '../logo_primary.png'

export default function ({ onRegistered }) {
    const { setFeedback } = useContext(Context)
    const register = event => {
        event.preventDefault()

        const { target: { username: { value: username }, email: { value: email }, password: { value: password } } } = event

        try {
            registerUser(username, email, password)
                .then(() => {
                    onRegistered()
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))

        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <div className="Register">
        <img className='Register__image' src={logo} alt="logo" />
        <form className="Register__form" onSubmit={register}>
            <input className='Register__input' type='text' name='username' placeholder='username' />
            <input className='Register__input' type='email' name='email' placeholder='email' />
            <input className='Register__input' type='password' name='password' placeholder='password' />
            <button className='Register__submit' >Register</button>
            <div className='Register__Login'><span className='Register__account'>don't have an account?</span><a className='Register__goLogin' href="/login">Login</a></div>
        </form>
    </div>

}
