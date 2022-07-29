import './Landing.css'
import logo from '../logo_white.png'
import menu from '../menu__white.png'
import { useNavigate } from 'react-router-dom'



export default function Landing() {
    const navigate = useNavigate()
    return <div className='Landing' >
        <img className='Landing__image' src={logo} alt="logo" />
        <p className='Landing__text'>Make your menu</p>
        <img className='Landing__menu' src={menu} alt="logo" />
        <div className='Landing__controls'>
            <button className='Landing__button' onClick={() => navigate(`/login`)}>Login</button>
            <div className='Landing__registerControl'>
                <p className='Landing__registerText'>don't have an account?</p>   <button className='Landing__register' onClick={() => navigate(`/register`)}>Register</button>

            </div>
        </div>
    </div>
}