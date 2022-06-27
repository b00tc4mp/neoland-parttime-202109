import './Nav.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoDocumentTextOutline, IoSettingsOutline, IoPowerOutline, IoCartOutline, IoHomeOutline, IoClose, IoMenu } from "react-icons/io5"

function Nav({ handleLogout }) {
    const [sidebar, setSidebar] = useState(false) //no showing por defecto
    const navigate = useNavigate()

    const handleShowSidebar = () => setSidebar(!sidebar)

    return (
        <>  

            <div className='Navbar '>
                <IoMenu className='Navbar__icon' onClick={handleShowSidebar} />
            </div>

            <nav className={sidebar ? 'Navmenu active' : 'Navmenu'}>
                <ul className='Navmenu__items' onClick={handleShowSidebar}>
                    <li className='Navmenu__items-toggle'>
                        <IoClose className='Navbar__icon' onClick={handleShowSidebar} />
                    </li>

                    <li className='Navmenu__items-li' onClick={() => navigate("/")}>
                        <IoHomeOutline className='Navmenu__items-li-icon' />
                        <span className='Navmenu__items-li-text'>Home</span>
                    </li>

                    <li className='Navmenu__items-li' onClick={() => navigate("/suppliers")}>
                        <IoCartOutline className='Navmenu__items-li-icon' />
                        <span className='Navmenu__items-li-text'>Suppliers</span>
                    </li>

                    <li className='Navmenu__items-li' onClick={() => navigate("/orders")}>
                        <IoDocumentTextOutline className='Navmenu__items-li-icon' />
                        <span className='Navmenu__items-li-text'>Orders</span>
                    </li>

                    <li className='Navmenu__items-li' onClick={() => navigate("/settings")}>
                        <IoSettingsOutline className='Navmenu__items-li-icon' />
                        <span className='Navmenu__items-li-text'>Settings</span>
                    </li>

                    <li className='Navmenu__items-li' onClick={handleLogout}>
                        <IoPowerOutline className='Navmenu__items-li-icon' />
                        <span className='Navmenu__items-li-text'>Logout</span>
                    </li>
                </ul>
            </nav >
        </>
    )
}
export default Nav