import './UpdateUserPassword.css'
import { updatePassword } from '../logic'
import { useContext, useState } from 'react'
import Context from './Context'

import { errors } from 'commons'
const { AuthError, NotFoundError } = errors

function UpdateUserPassword({ handleShowChangePassword }) {
    const { setFeedback } = useContext(Context)
    const [passwordShown, setPasswordShown] = useState(false)

    const toggleShowPassword = () => {
        setPasswordShown(!passwordShown)
    }

    const goBack = () => {
        handleShowChangePassword()
    }

    const handleUpdatePassword = event => {
        event.preventDefault()

        const oldPassword = event.target.oldPassword.value
        const newPassword = event.target.newPassword.value

        try {
            updatePassword(sessionStorage.token, oldPassword, newPassword)
                .then(() => {
                    setFeedback({ level: 'info', message: 'Password changed successfully' })
                })
                .catch(error => {
                    setFeedback({ level: 'error', message: error.message })
                })
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <form className="UpdatePassword" onSubmit={handleUpdatePassword}>
        <h3 className="UpdatePassword__title">Change Password</h3>
        <div className='UpdatePassword__input UpdatePassword__input--noPadding'>
            <input className='UpdatePassword__input UpdatePassword__input__password' type={passwordShown ? "text" : "password"} name="oldPassword" placeholder="current password" required />
            <img className='UpdatePassword__image-hide-show-password' onClick={toggleShowPassword} src={passwordShown ? "./images/visibilityOn.png" : "./images/visibilityOff.png"} />
        </div>
        <div className='UpdatePassword__input UpdatePassword__input--noPadding'>
            <input className='UpdatePassword__input UpdatePassword__input__password' type={passwordShown ? "text" : "password"} name="newPassword" placeholder="new password" required />
            <img className='UpdatePassword__image-hide-show-password' onClick={toggleShowPassword} src={passwordShown ? "./images/visibilityOn.png" : "./images/visibilityOff.png"} />
        </div>
        <div className='UpdatePassword__button-container'>
            <button className='UpdatePassword__button' type='submit'>Update Password</button>
            <button className='UpdatePassword__button UpdatePassword__button--small' onClick={goBack}>Go Back</button>
        </div>
    </form>
}

export default UpdateUserPassword