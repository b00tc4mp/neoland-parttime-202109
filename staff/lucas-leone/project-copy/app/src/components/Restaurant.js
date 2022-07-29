import './Update.css'
import './x.css'
import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { retrieveRestaurant, updateRestaurant, unregisterRestaurant } from "../logic"
import Context from './Context'

export default function ({Onlogout}) {
    const { setFeedback } = useContext(Context)
    const [restaurant, setRestaurant] = useState()
    const [controls, setControls] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    const { listId } = params

    useEffect(() => {
        restaurantDetail()
    }, [listId])

    const restaurantDetail = () => {
        try {
            retrieveRestaurant(sessionStorage.token)
                .then(restaurant => setRestaurant(restaurant))
                .catch((error) => setFeedback({ level: 'info', message: error.message }))

        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }
    const handleUpdateRestaurant = (event) => {
        event.preventDefault()

        const { target: { username: { value: username }, email: { value: email } } } = event
        try {
            updateRestaurant(sessionStorage.token, username, email)
                .then(() => navigate(`/`))
                .catch((error) => setFeedback({ level: 'info', message: error.message }))

        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }
    const handleGoBack = () => {
        navigate(`/`)
    }
    const handlePassword = () => {
        setControls(!controls)
    }

    const handleDeleteRestaurant = (event) => {
        event.preventDefault()
        const { target: { password: { value: password } } } = event

        try {
            unregisterRestaurant(sessionStorage.token, password)
                .then(() => {
                    Onlogout()
                })
                .catch(error => setFeedback({ level: 'info', message: error.message }))

        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }

    return <div className='updateUser'>
        {restaurant && <>
            <h1 className='updateUser_title'>Update Restaurant</h1>
            <button className='x' onClick={handleGoBack}>x</button>
            <form className='updateUser__form' onSubmit={handleUpdateRestaurant}>
                <input className='updateUser__input' type="text" name="username" placeholder='Username' defaultValue={restaurant.username} ></input>
                <input className='updateUser__input' type="email" name="email" placeholder='Email' defaultValue={restaurant.email} ></input>
                <button className='updateUser__submit' onClick='submit'>Save</button>
            </form>

            <button className='updateUser__subButton' onClick={handlePassword}>Unregister Restaurant</button>
            {controls && < form className='updateUser__deleteForm' onSubmit={handleDeleteRestaurant}>
                <h4 className='updateUser__subTitle UpdateUser_confirm'>Confirm with password</h4>
                <input className='updateUser__input UpdateUser_confirm' type="password" name="password" ></input>
                <button className='updateUser__subButton' >Unregister</button>
            </form>}
        </>}
    </div>

}