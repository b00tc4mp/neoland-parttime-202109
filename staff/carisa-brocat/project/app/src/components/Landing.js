import './Landing.css'
import { Link } from 'react-router-dom'

function Landing() {
    return <div className='Landing'>
        <img className='Landing__logo' src="./images/appLogo.png" alt='app-logo' />

        <p className='Landing__headerText'>For all that afro hairs out there, searching for a community where find support and answer to all their questions </p>

        <div className='Landing_nav'>
            <button className='Landing_nav-button'><Link to='/register'>Register</Link></button>
            <button className='Landing_nav-button'><Link to='/login'>LogIn</Link></button>
        </div>
        <span>If you don't want to register, please go to LogIn and use the guest profile already configurated. <br></br>If you're already register use your account</span>

        <footer className='Landing__footer'>
            <div className='Landing__footer-contact'>
                <p>About Us</p>
                <p>Contact</p>
            </div>
            <div className='Landing__footer-copyright'>
                <img className='Landing__footer-copyright-img' src='https://st2.depositphotos.com/1032749/8625/v/450/depositphotos_86257870-stock-illustration-copyright-symbol-icon.jpg' />
                <p>RockYorAfro by LePetiteDeveloppeur</p>
            </div>
        </footer>
    </div>
}

export default Landing