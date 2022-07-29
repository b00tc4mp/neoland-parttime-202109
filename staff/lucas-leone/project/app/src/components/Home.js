import './Home.css'
import { useState } from 'react'
import Feed from "./Feed"
import Detail from './Detail'
import { Routes, Route, useNavigate } from 'react-router-dom'
import CreateList from './CreateList'
import UpdateSection from './UpdateSection'
import UpdateItem from './UpdateItem'
import CreateSection from './CreateSection'
import CreateItem from './CreateItem'
import Restaurant from './Restaurant'
import SharePoint from "./SharePoint";
import share from '../share__white.png'

export default function ({ onLoggedOut }) {
    const [refresh, setRefresh] = useState()
    const navigate = useNavigate()

    const logout = () => {
        delete sessionStorage.token
        onLoggedOut()
    }
    const handleClose = () => {
        navigate(`/`)
    }

    const handleShare = () => {
        navigate(`/share`)
    }

    const handleRestaurant = () => {
        navigate(`/restaurant`)
    }
//THE NAV BUTTONS WAS CREATED HERE
    return <div className='Home'>
        <div className='Home__nav'>
            <button className='Home__navButton' onClick={handleRestaurant}>user</button>
            <button className='Home__navButton' onClick={logout}>Logout</button>
            <img className='Home__navShare' src={share} onClick={handleShare} alt="logo" />
        </div>

        <Routes>
            <Route path='/restaurant' element={<Restaurant Onlogout={logout} />} />
            <Route path='/list' element={<CreateList onSaved={handleClose} />} />
            <Route path="/list/:listId" element={<Detail />} />
            <Route path="/list/:listId/section/:sectionId" element={<UpdateSection />} />
            <Route path="/list/:listId/section" element={<CreateSection />} />
            <Route path="/list/:listId/section/:sectionId/item/:itemId" element={<UpdateItem />} />
            <Route path="/share" element={<SharePoint />} />
            <Route path="/list/:listId/section/:sectionId/item" element={<CreateItem />} />
            <Route path="/*" element={<Feed refresh={refresh} />} />
        </Routes>

    </div>
}


