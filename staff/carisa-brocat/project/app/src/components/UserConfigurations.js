import './UserConfigurations.css'
import { updateUser } from '../logic'
import { errors } from 'commons'
import { useState } from 'react'
import UpdateUserEmail from './UpdateUserEmail'
import UpdateUserPassword from './UpdateUserPassword'
import { useContext } from 'react'
import Context from './Context'
import uploadImage from './helps/uploadImage'
import InputCheckboxQuiz from './InputCheckboxQuiz'

const { AuthError, NotFoundError } = errors

function UserConfigurations({ user, handleRefresh }) {
    const { setFeedback } = useContext(Context)

    const userNickname = user?.nickname
    const userHairTexture = user?.hairTexture

    const [onChangePassword, setOnChangePassword] = useState(false)
    const [onChangeEmail, setOnChangeEmail] = useState(false)
    const [imageB64, setImageB64] = useState()
    let userImage = imageB64 ?? user?.image

    const handleUploadImage = (event) => {
        uploadImage(event, setImageB64)
    }

    const handleShowChangePassword = () => {
        setOnChangePassword(!onChangePassword)
    }

    const handleShowChangeEmail = () => {
        setOnChangeEmail(!onChangeEmail)
    }

    const handleDeleteImage = () => {
        setImageB64('./images/profile.png')

        userImage = null
    }

    const handleUpdateUser = event => {
        event.preventDefault()

        const { target: { nickname: { value: nickname }, hairTexture: { value: hairTexture }, interests } } = event

        const interestsArray = []

        interests.forEach(interest => {
            if (interest.checked) {
                interestsArray.push(interest.value)
            }
        })

        try {
            updateUser(sessionStorage.token, nickname, userImage, hairTexture, interestsArray)
                .then(() => {
                    handleRefresh()

                    setFeedback({ level: 'info', message: 'User changed successfully' })
                })
                .catch(error => {
                    setFeedback({ level: 'error', message: error.message })
                })
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <div className="UserConfiguration">
        <h1 className="UserConfiguration__title">Configuration</h1>
        {onChangePassword ? <UpdateUserPassword handleShowChangePassword={handleShowChangePassword} />
            :
            (onChangeEmail ? <UpdateUserEmail handleShowChangeEmail={handleShowChangeEmail} />
                :
                <div className="UserConfiguration__container">
                    <form className="UserConfiguration__form" onSubmit={handleUpdateUser}>
                        <div className='UserConfiguration__upload-userImage'>
                            <label>
                                <input className="UserConfiguration__InputFile" type="file" name="image" onChange={handleUploadImage} />
                                <div className='UserConfiguration__user-image'>
                                    <img src={userImage ?? "./images/profile.png"} alt="userImage" />
                                </div>
                            </label>

                            <button type='button' className='UserConfiguration__deleteImage-button' onClick={handleDeleteImage}>x</button>
                        </div>

                        <input className="UserConfiguration__Nickname" type="text" name="nickname" defaultValue={userNickname} />
                        <div className="UserConfiguration__container UserConfiguration__container--margin-top">
                            <div className='UserConfiguration__hairTexture'>
                                <label>Hair Texture: </label>
                                <select id='hairTexture' name='hairTexture' defaultValue={user?.hairTexture}>
                                    <option value='3a'>3a</option>
                                    <option value='3b'>3b</option>
                                    <option value='3c'>3c</option>
                                    <option value='4a'>4a</option>
                                    <option value='4b'>4b</option>
                                    <option value='4c'>4c</option>
                                </select>
                            </div>
                            <div className='UserConfiguration__interests'>
                                <h2> Interests: </h2>
                                <fieldset className="UserConfiguration__fieldset UserConfiguration__fieldset-interests">
                                    <InputCheckboxQuiz name='interests' value='moisture' text='Moisture' />
                                    <InputCheckboxQuiz name='interests' value='growth' text='Growt' />
                                    <InputCheckboxQuiz name='interests' value='restore' text='Restore' />
                                    <InputCheckboxQuiz name='interests' value='definition' text='Definition' />
                                    <InputCheckboxQuiz name='interests' value='strength' text='Strength' />
                                </fieldset>
                            </div>
                        </div>

                        <button className='UserConfiguration__button' type="submit">Save</button>
                    </form>
                    <div className="UserConfiguration__container__footer">
                        <button className='UserConfiguration__button UserConfiguration__button--large' onClick={handleShowChangeEmail}>Change Email</button>
                        <button className='UserConfiguration__button UserConfiguration__button--large' onClick={handleShowChangePassword}>Change Password</button>
                    </div>
                </div>
            )}
    </div>
}

export default UserConfigurations


