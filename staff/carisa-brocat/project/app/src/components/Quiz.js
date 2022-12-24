import './Quiz.css'
import InputRadioQuiz from './InputRadioQuiz'
import InputCheckboxQuiz from './InputCheckboxQuiz'
import { updateUserHairTextureAndInterests } from '../logic'
import { useContext, useState } from 'react'
import Context from './Context'

import { errors } from 'commons'
const { AuthError, NotFoundError } = errors

function Quiz({ onQuizPassed }) {
    const { setFeedback } = useContext(Context)

    const onQuiz = event => {
        event.preventDefault()

        const { target: { hairTexture: { value: hairTexture }, interests } } = event

        const interestsArray = []

        interests.forEach(interest => {
            if (interest.checked) {
                interestsArray.push(interest.value)
            }
        })


        if ((!hairTexture) || (interestsArray.length === 0)) {
            return (setFeedback({ level: 'error', message: 'Please select a hair texture and at least and interest ' }))
        }

        try {
            updateUserHairTextureAndInterests(sessionStorage.token, hairTexture, interestsArray)
                .then(() => {
                    onQuizPassed()
                })
                .catch(error => {
                    if (error instanceof NotFoundError && error.message.includes('user') && error.message.includes('not found'))
                        delete sessionStorage.token

                    alert(error.message)
                })
        } catch (error) {
            if (error instanceof AuthError)
                delete sessionStorage.token

            alert(error.message)
        }
    }

    const skipQuiz = event => {
        event.stopPropagation()

        try {
            updateUserHairTextureAndInterests(sessionStorage.token, "", [])
                .then(() => {
                    onQuizPassed()
                })
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    return <div className='Quiz'>
        <img className='Quiz__logo' src="./images/appLogo.png" alt='app-logo' />

        <form className='Quiz__form' onSubmit={onQuiz}>
            <p className='Quiz__form__text'>Tell us your type of hair and let us help to find what are you looking for quickly</p>
            <fieldset className="Quiz__fieldset Quiz__fieldset-hairtexture">
                <InputRadioQuiz name='hairTexture' value='3a' text='3A' />
                <InputRadioQuiz name='hairTexture' value='3b' text='3B' />
                <InputRadioQuiz name='hairTexture' value='3c' text='3C' />
                <InputRadioQuiz name='hairTexture' value='4a' text='4A' />
                <InputRadioQuiz name='hairTexture' value='4b' text='4B' />
                <InputRadioQuiz name='hairTexture' value='4c' text='4C' />
            </fieldset>

            <p className='Quiz__form__text'>What would you like for your hair?</p>
            <fieldset className="Quiz__fieldset Quiz__fieldset-interests">
                <InputCheckboxQuiz name='interests' value='moisture' text='Moisture' />
                <InputCheckboxQuiz name='interests' value='growth' text='Growt' />
                <InputCheckboxQuiz name='interests' value='restore' text='Restore' />
                <InputCheckboxQuiz name='interests' value='definition' text='Definition' />
                <InputCheckboxQuiz name='interests' value='strength' text='Strength' />
            </fieldset>

            <div className='Quiz__form__footer'>
                <button className="Quiz__button-footer" onClick={skipQuiz}>Do It Later</button>
                <button className="Quiz__button-footer" type='submit'>Next</button>
            </div>
        </form>
    </div>
}

export default Quiz