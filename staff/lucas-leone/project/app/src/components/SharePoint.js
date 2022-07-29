import './SharePoint.css'
import './x.css'
import { useNavigate } from "react-router-dom"
import QRCode from "react-qr-code"
import { useEffect, useState, useContext } from "react"
import { retrieveRestaurant } from "../logic"
import Context from './Context'

export default function () {
    const { setFeedback } = useContext(Context)
    const navigate = useNavigate()
    const [menuLink, setMenuLink] = useState()
    const [restaurant, setRestaurant] = useState()

    useEffect(() => {
        retrieveUserId()
    }, [])

    const retrieveUserId = () => {
        try {
            retrieveRestaurant(sessionStorage.token)
                .then(restaurant => {
                    setRestaurant(restaurant)
                    setMenuLink(`http://localhost:3000/menu/${restaurant.username}`)
                }
                )
                .catch((error) => setFeedback({ level: 'info', message: error.message }))

        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }

    const goToMenu = () => { navigate(`../menu/${restaurant.username}`) }
    const handleGoBack = () => {
        navigate(`/`)
    }

    return <div className="sharePoint">
        {restaurant ? <>
            <button className='x' onClick={handleGoBack}>x</button>
            <h1 className='sharePoint_share'>Share</h1>
            <p className='sharePoint_text'>copia el sgiguiente link</p>
            <input className='sharePoint_input' type="text" name="link" defaultValue={menuLink} ></input>
            <QRCode value={menuLink} size={125} bgColor="#282c34" fgColor="#fff" level="H" />
            <button className='sharePoint_button' onClick={goToMenu}>Go</button></> : <></>}

    </div>


}