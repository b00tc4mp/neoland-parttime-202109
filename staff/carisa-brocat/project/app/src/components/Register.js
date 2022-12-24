import './Register.css'
import { Link } from 'react-router-dom'
import { registerUser } from '../logic'
import { useContext, useState } from 'react'
import Context from './Context'

function Register({ onRegistered }) {
    const { setFeedback } = useContext(Context)
    const [passwordShown, setPasswordShown] = useState(false)

    const toggleShowPassword = () => {
        setPasswordShown(!passwordShown)
    }

    const register = event => {
        event.preventDefault()

        const nickname = event.target.nickname.value
        const email = event.target.email.value
        const password = event.target.password.value

        try {
            registerUser(nickname, email, password)
                .then(() => {
                    onRegistered()
                })
                .catch(error => {
                    setFeedback({ level: 'error', message: error.message })
                })
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <div className="Register">
        <img className='Register__logo' src="./images/appLogo.png" alt='app-logo' />

        <form className='Register__form' onSubmit={register} >
            <input className='Register__form-input' type="text" name="nickname" placeholder="nickname" required />
            <input className='Register__form-input' type="email" name="email" placeholder="email" required />
            <div className='Register__form-input Register__form-input--noPadding'>
                <input className='Register__form-input Register__form-input__password' type={passwordShown ? "text" : "password"} name="password" placeholder="password" required />
                <img className='Register__image-hide-show-password' onClick={toggleShowPassword} src={passwordShown ? "./images/visibilityOn.png" : "./images/visibilityOff.png"} />
            </div>
            <button className='Register__form-button' type="submit">Register</button>
        </form>

        <p className='Register__link'>Do you already have an account?<br></br>
            <Link to="/login">LogIn</Link>
        </p>

        <footer className='Register__footer'>
            <div className='Register__footer-contact'>
                <p>About Us</p>
                <p>Contact</p>
            </div>
            <div className='Register__footer-copyright'>
                <img className='Register__footer-copyright-img' src='https://st2.depositphotos.com/1032749/8625/v/450/depositphotos_86257870-stock-illustration-copyright-symbol-icon.jpg' />
                <p>RockYorAfro by LePetiteDeveloppeur</p>
            </div>
        </footer>
    </div>
}

export default Register