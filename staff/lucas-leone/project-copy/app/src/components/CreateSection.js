
import './Create.css'
import './x.css'
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { addSectionToList } from "../logic"
import { useContext } from 'react'
import Context from './Context'

export default () => {
    const { setFeedback } = useContext(Context)
    const [errorFeedback, setErrorFeedback] = useState(false)
    const params = useParams()
    const { listId } = params
    const navigate = useNavigate()

    const handleSave = event => {
        event.preventDefault()

        const { target: { name: { value: name } } } = event
        //THIS CREATE THE NEW SECTION AND GO TO THE SAME SECTION FOR UODATE
        try {
            addSectionToList(sessionStorage.token, listId, name)
                .then(section => {
                    navigate(`/list/${listId}/section/${section}`)
                })
                .catch((error) => setFeedback({ level: 'info', message: error.message }))

        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }

    const handleCreateItem = () => {
        setErrorFeedback(!errorFeedback)
    }

    const handleGoBack = () => {
        navigate(`/list/${listId}`)
    }

    return <div className='Create'>
        <button className='x' onClick={handleGoBack}>x</button>
        <h1 className='Create__titleMargin'>Create Section</h1>
        <form className='Create__form' onSubmit={handleSave}>
            <input className='Create__input' type="text" name="name" placeholder='Name'></input>

            <button className='Create__submit' type="submit">Done</button>
        </form>
        {/* <h3 className='Create__subtitle Create__subtitle-margin'>Items</h3>
        {errorFeedback ?
            <>
                <p>You need a name of this section</p></>
            : <></>}
        <button className='Create_plusButton' onClick={handleCreateItem}>+</button> */}

    </div>


}