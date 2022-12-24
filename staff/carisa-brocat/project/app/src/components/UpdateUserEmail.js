import './UpdateUserEmail.css'
import { updateEmail } from '../logic'
import { useContext,useState } from 'react'
import Context from './Context'

import { errors } from 'commons'
const { AuthError, NotFoundError } = errors

function UpdateUserEmail({ handleShowChangeEmail }) {
    const { setFeedback } = useContext(Context)
    const [passwordShown, setPasswordShown] = useState(false)

    const toggleShowPassword = () => {
        setPasswordShown(!passwordShown)
    }

    const goBack = () => {
        handleShowChangeEmail()
    }

    const handleUpdateEmail = event => {
        event.preventDefault()

        const password = event.target.password.value
        const email = event.target.email.value

        try {
            updateEmail(sessionStorage.token, password, email)
                .then(() => {
                    setFeedback({ level: 'info', message: 'Email changed successfully' })
                })
                .catch(error => {
                    setFeedback({ level: 'error', message: error.message })
                })
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <form className="UpdateEmail" onSubmit={handleUpdateEmail}>
        <h3 className="UpdateEmail__title">Change Email</h3>
        <input className='UpdateEmail__input UpdateEmail__input-email' type="text" name="email" placeholder="email" required />
        <div className='UpdateEmail__input UpdateEmail__input--noPadding'>
            <input className='UpdateEmail__input UpdateEmail__input__password' type={passwordShown ? "text" : "password"} name="oldPassword" placeholder="current password" required />
            <img className='UpdateEmail__image-hide-show-password' onClick={toggleShowPassword} src={passwordShown ? "./images/visibilityOn.png" : "./images/visibilityOff.png"} />
        </div>
        <div className='UpdateEmail__button-container'>
            <button className='UpdateEmail__button' type='submit'>Modify Email</button>
            <button className='UpdateEmail__button UpdateEmail__button--small' onClick={goBack}>Back</button>
        </div>
    </form>

}

export default UpdateUserEmail