import './x.css'
import './Update.css'
import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { updateSection, retrieveItemsFromSection, retrieveSection, removeItem, retrieveItems, deleteItem } from "../logic"
import Context from './Context'

export default () => {
    const { setFeedback } = useContext(Context)
    const [items, setItems] = useState()
    const [allItems, setAllItems] = useState()
    const [itemsFiltered, setItemsFiltered] = useState()
    const [section, setSection] = useState()
    const [control, setControl] = useState(false)
    const [deleteControl, setDeleteControl] = useState(false)
    const params = useParams()
    const { listId, sectionId } = params
    const navigate = useNavigate()

    useEffect(() => {
        detailSection()
        retrieveAllItems()

    }, [control])
    const retrieveAllItems = () => {
        try {
            retrieveItems(sessionStorage.token)
                .then(items => {
                    setAllItems(items)
                })
                .catch((error) => setFeedback({ level: 'info', message: error.message }))

        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }

    const detailSection = () => {
        try {
            retrieveSection(sessionStorage.token, listId, sectionId)
                .then(section => {
                    setSection(section)
                    retrieveItemFromIds(section.items)
                })
                .catch((error) => setFeedback({ level: 'info', message: error.message }))

        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }

    const retrieveItemFromIds = (itemsIds) => {
        try {
            retrieveItemsFromSection(sessionStorage.token, itemsIds)
                .then(items => setItems(items))
                .catch((error) => setFeedback({ level: 'info', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }

    const handleSave = event => {
        event.preventDefault()
        const { target: { name: { value: name } } } = event
        const { items } = section
        try {
            updateSection(sessionStorage.token, listId, sectionId, name, items)
                .then(() => {
                    navigate(`/`)
                })
                .catch(error => setFeedback({ level: 'info', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }

    const handleRemoveItem = (itemId) => {
        try {
            removeItem(sessionStorage.token, listId, sectionId, itemId)
                .then(() => {
                    detailSection()
                })
                .catch(error => setFeedback({ level: 'info', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }

    const handleUpdateItem = (itemId) => {
        navigate(`/list/${listId}/section/${sectionId}/item/${itemId}`)
    }

    const handleGoBack = () => {
        navigate(`/list/${listId}`)
    }

    const handleCreateItem = (event) => {
        navigate(`/list/${listId}/section/${sectionId}/item`)
    }
    const queryItems = (query) => {

        const itemsFilter = allItems.filter(item => item.name.toLowerCase().includes(query))
        setItemsFiltered(itemsFilter)
    }

    const handleOnChangeitem = (item) => {
        const itemIndex = section.items.findIndex(_item => _item === item.id)
        if (itemIndex < 0) {
            section.items.push(item.id)
        } else {
            section.items.splice(itemIndex, 1)
        }
        setSection(section)
        retrieveItemFromIds(section.items)
    }

    const handleDeleteControl = () => {
        setDeleteControl(!deleteControl)
    }

    const handleDeleteItem = (itemId) => {
        try {
            deleteItem(sessionStorage.token, itemId)
                .then(() => {
                    const itemIndex = itemsFiltered.findIndex(_item => _item.id === itemId)
                    itemsFiltered.splice(itemIndex, 1)
                    setItemsFiltered(itemsFiltered)

                })
                .catch(error => setFeedback({ level: 'info', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }

    return <div className='updateSection' >
        {items ? <>
            <button className='x' onClick={handleGoBack}>x</button>
            <h1 className='updateSection_title'>Update Section</h1>
            <form className='updateSection__form' onSubmit={handleSave}>
                <input className='updateSection__input' type="text" name="name" defaultValue={section.name} ></input>
                <button className='updateSection__submit' type="submit">Save</button>
            </form>
            <h4 className='updateSection_subTitle' >Items</h4>
            <ul className='update__Lists'>
                {items.map(item =>
                    <li className='updateSection_item' >
                        <p className='updateList_subText'>{item.name}</p>
                        <button className='updateSection__subButton' onClick={() => handleUpdateItem(item.id)}>Edit</button>
                        <button className='updateSection__subButton' onClick={() => handleRemoveItem(item.id)}>Remove</button></li>
                )}
            </ul>
            <input className='updateSection__input' type="text" name="query" placeholder='Buscar Items' onChange={(event) => { queryItems(event.target.value) }}></input>
            {itemsFiltered ? <ul>{itemsFiltered.map(itemFiltered =>
                <li><><input className='updateSection__inpu' type="checkbox" name="items" defaultValue={itemFiltered.id} onChange={() => handleOnChangeitem(itemFiltered)} defaultChecked={items.some(_item => _item.name === itemFiltered.name)} />{itemFiltered.name}
                    <button className='updateSection__subButton' onClick={handleDeleteControl}>Delete</button>
                    {deleteControl && <div className='update__delete'>
                        <p className='update_deleteText'>Are you sure?</p>
                        <div className='update_deleteContentButton'>
                            <button className='update_deleteButton' onClick={() => {
                                handleDeleteItem(itemFiltered.id)
                                handleDeleteControl()
                            }}>Yes</button>
                            <button className='update_deleteButton' onClick={handleDeleteControl}>No</button>
                        </div>
                    </div>}
                </></li>)}
            </ul>
                : <></>}
            <button className='updateSection_createButton' onClick={handleCreateItem}>+</button>

        </> :
            <></>
        }
    </div >


}