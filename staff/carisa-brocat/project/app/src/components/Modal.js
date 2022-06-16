import './Modal.css'
import { errors } from 'commons'
import { useEffect, useState } from 'react'
const { AuthError } = errors

export default ({ content, handleCloseModal }) => {
    const handleClickOnContent = event => {
        event.stopPropagation()
    }

    const closeModal = () => {
        handleCloseModal()
    }

    return <div className='modal' onClick={closeModal}>
        <div className='modal__content' onClick={handleClickOnContent}>
            {content}
        </div>
    </div>
}
