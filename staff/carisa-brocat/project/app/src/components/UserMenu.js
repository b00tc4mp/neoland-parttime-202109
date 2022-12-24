import './UserMenu.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { errors } from 'commons'
const { AuthError } = errors

export default ({ handleSavedPosts, menuOpen, handleMenu, handleMyPosts, onLoggedOut, user }) => {
    const navigate = useNavigate()

    const closeMenu = () => {
        handleMenu()
    }

    const showSavedPosts = event => {
        event.preventDefault()

        handleSavedPosts()

        handleMenu()
    }

    const showMyPosts = event => {
        event.preventDefault()

        handleMyPosts()

        handleMenu()
    }

    const handleUnregister = () => {
        handleMenu()

        navigate('/unregister')
    }

    const handleUserConnfigurations = () => {
        handleMenu()

        navigate('/configurations')
    }

    return <div className={`${menuOpen ? 'UserMenu__container' : 'UserMenu'}`}>
        <div className={`${menuOpen ? 'UserMenu UserMenu--opened' : 'UserMenu UserMenu--closed'}`}>
            <button className='UserMenu__close-button' onClick={closeMenu} >x</button>
            <div className='UserMenu__header'>
                <div className='UserMenu__header__user-image'>
                    <img src={user?.image ?? "./images/profile.png"} alt="userImage" />
                </div>
                <p>{user?.nickname}</p>
            </div>
            <h2 onClick={showSavedPosts}>My Saved Posts</h2>
            <h2 onClick={showMyPosts}>My Posts</h2>
            <h2 onClick={handleUserConnfigurations}>Configurations</h2>
            <h2 onClick={handleUnregister}>Unregister</h2>
            <div className='UserMenu__footer'>
                <h2 >LogOut </h2>
                <img src="./images/logoutImg.png" alt="userImage" onClick={onLoggedOut}  />
            </div>

        </div>
    </div>
}