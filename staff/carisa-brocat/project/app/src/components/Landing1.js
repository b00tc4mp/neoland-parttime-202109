import { Link } from 'react-router-dom'
import './Landing.css'
import { useState } from 'react'

function Landing() {
    const [infoShowed, setInfoShowed] = useState(false)
    const [contentStyle, setContentStyle] = useState()

    const handleshowContent = () => {
        if (infoShowed) {
            setContentStyle('')
            setInfoShowed(!infoShowed)
        }
        else {
            setContentStyle('Landing__info-content--showed')
            setInfoShowed(!infoShowed)
        }
    }

    return <div className='Landing'>
        <img className='Landing__logo' src="./images/appLogo.png" />
        <p className='Landing__headerText'>For all that afro hairs out there, searching for a community where find support and answer to all their questions </p>
        <div className='Landing_nav'>
            <button className='Landing_nav-button'><Link to='/register'>Register</Link></button>
            <button className='Landing_nav-button'><Link to='/login'>LogIn</Link></button>
        </div>
        <div className="Landing__info" >
        <button type="button" className="Landing__info-button" onClick={handleshowContent}>What can I do on RockYourAfro? +</button>
        <p className={`Landing__info-content ${contentStyle}`}>Lorem ipsum dolor sit amet,
            consectetur adipisicing elit,
            sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>  
        </div>
        <div className='Landing__app-example'>
        <img className='Landing__app-example-image' src="./images/Landing-1.png" />
        <img className='Landing__app-example-image' src="./images/Landing-2.png" />
        </div>
        
    </div>
}

export default Landing