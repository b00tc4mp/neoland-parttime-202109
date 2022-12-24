import './Unregister.css'
import Modal from './Modal'
import { useState } from 'react'
import { deleteUser } from '../logic'
import { useContext } from 'react'
import Context from './Context'

import { errors } from 'commons'
const { AuthError, NotFoundError } = errors

function Unregister({ logOut }) {
    const { setFeedback } = useContext(Context)
    const [modalOpen, setModalOpen] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false)

    const toggleShowPassword = () => {
        setPasswordShown(!passwordShown)
    }

    const unregisterConfirmation = event => {
        event.preventDefault()

        setModalOpen(true)
    }

    const handleDeleteUser = event => {
        event.preventDefault()

        const password = event.target.password.value

        try {
            deleteUser(sessionStorage.token, password)
                .then(() => {
                    setModalOpen(false)

                    logOut()
                })
                .catch(error => {
                    setModalOpen(false)

                    setFeedback({ level: 'error', message: error.message })
                })
        } catch (error) {
            setModalOpen(false)

            setFeedback({ level: 'error', message: error.message })
        }
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    return <div className="Unregister">
        <h1 className="Unregister__title">Unregister</h1>
        <form className="Unregister__form" onSubmit={handleDeleteUser} >
            <div className='Unregister__form-input Unregister__form-input--noPadding'>
                <input className='Unregister__form-input Unregister__form-input__password' type={passwordShown ? "text" : "password"} name="password" placeholder="password" required />
                <img className='Unregister__image-hide-show-password' onClick={toggleShowPassword} src={passwordShown ? "./images/visibilityOn.png" : "./images/visibilityOff.png"} />
            </div>
            <button onClick={unregisterConfirmation} className="Unregister__form-button">Delete</button>

            {modalOpen && <Modal handleCloseModal={handleCloseModal} content={<div className="Unregister__confirmation" >
                <p>Are you sure do you want to delete your account? </p>
                <button type="submit" className="Unregister__form-button Unregister__form-button--small">Yes</button>
            </div>} />}
        </form>
    </div>
}

export default Unregister