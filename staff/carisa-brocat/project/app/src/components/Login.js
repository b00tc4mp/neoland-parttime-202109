import './Login.css'
import { Link } from 'react-router-dom'
import { authenticateUser } from '../logic'
import { useContext, useState } from 'react'
import Context from './Context'

function Login({ onLoggedIn }) {
    const { setFeedback } = useContext(Context)
    const [passwordShown, setPasswordShown] = useState(false)

    const toggleShowPassword = () => {
        setPasswordShown(!passwordShown)
    }

    const login = event => {
        event.preventDefault()

        const { target: { email: { value: email }, password: { value: password } } } = event

        try {
            authenticateUser(email, password)
                .then(token => {

                    sessionStorage.token = token

                    onLoggedIn()
                })
                .catch(error => {
                    setFeedback({ level: 'error', message: error.message })
                })
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <div className='Login'>
        <img className='Login__logo' src="./images/appLogo.png" alt='app-logo' />

        <form className='Login__form' onSubmit={login} >
            <input className='Login__form-input' type="email" name="email" defaultValue={"guest_user@gmail.com"} required />
            <div className='Login__form-input Login__form-input--noPadding'>
                <input className='Login__form-input Login__form-input__password' type={passwordShown ? "text" : "password"} name="password" defaultValue={'12345678'} required />
                <img className='Login__image-hide-show-password' onClick={toggleShowPassword} src={passwordShown ? "./images/visibilityOn.png" : "./images/visibilityOff.png"} />
            </div>
            <button type='submit' className='Login__form-button'>LogIn</button>
        </form>

        <p className='Login__link'>New in RockUrAfro?<br></br>
            <Link to="/register">Register</Link>
        </p>

        <footer className='Login__footer'>
            <div className='Login__footer-contact'>
                <p>About Us</p>
                <p>Contact</p>
            </div>
            <div className='Login__footer-copyright'>
                <img className='Login__footer-copyright-img' src='https://st2.depositphotos.com/1032749/8625/v/450/depositphotos_86257870-stock-illustration-copyright-symbol-icon.jpg' />
                <p>RockYorAfro by LePetiteDeveloppeur</p>
            </div>
        </footer>
    </div>
}

export default Login