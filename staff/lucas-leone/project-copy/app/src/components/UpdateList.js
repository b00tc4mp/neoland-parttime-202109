import './Update.css'
import { useNavigate } from 'react-router-dom'
import { updateList, deleteSection } from '../logic'
import { useContext, useState } from 'react'
import Context from './Context'
//list: {id, name, description, sections},

export default ({ list: { id, name, description, sections, price }, refresh }) => {
    const { setFeedback } = useContext(Context)
    const navigate = useNavigate()
    const [deleteControl, setDeleteControl] = useState(false)

    const handleSave = event => {
        event.preventDefault()
        const { target: { name: { value: name }, description: { value: description }, price: { value: price } } } = event
        const numberPrice = parseFloat(price)
        try {
            updateList(sessionStorage.token, id, name, description, numberPrice)
                .then(() => {
                    navigate(`/`)
                })
                .catch(error => setFeedback({ level: 'info', message: error.message }))

        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }

    const handleUpdateSection = (sectionId) => {
        navigate(`/list/${id}/section/${sectionId}`)
    }

    const handleNewSection = () => {
        navigate(`/list/${id}/section`)
    }

    const handleDeleteControl = () => {
        setDeleteControl(!deleteControl)
    }

    const handleDeleteSection = (sectionId) => {
        try {
            deleteSection(sessionStorage.token, id, sectionId)
                .then(() => {
                    refresh()
                })
                .catch(error => setFeedback({ level: 'info', message: error.message }))

        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }

    return <div className='updateList'>
        <h1 className='updateList_title'>Update List</h1>
        <form className='updateList__form' onSubmit={handleSave}>
            <input className='updateList__input' type="text" name="name" defaultValue={name} ></input>
            <textarea className='updateList__input' name="description" defaultValue={description} ></textarea>
            <input className='updateList__input' type="number" name="price" defaultValue={price} placeholder='Price for all the list' ></input>
            <button className='updateList__submit' type="submit">Save</button>
        </form>
        <h1 className='updateList_subTitle'>Sections</h1>
        <ul>
            {sections.map(section =>
                <li className='updateList_section'>
                    <p className='updateList_subText'>{section.name}</p>
                    <button className='updateList__subButton' onClick={() => handleUpdateSection(section.id)}>Edit</button>

                    <button className='updateList__subButton' onClick={handleDeleteControl}>Delete</button>
                    {deleteControl && <div className='update__delete'>
                        <p className='update_deleteText'>Are you sure?</p>
                        <button className='update_deleteButton' 
                        onClick={() => {
                                handleDeleteSection(section.id)
                                handleDeleteControl()
                            }}>Si</button>
                        <button className='update_deleteButton' onClick={handleDeleteControl}>No</button>
                    </div>}
                </li>
            )}
        </ul>
        <button className='updateList_createButton' onClick={handleNewSection}>+</button>
    </div>


}