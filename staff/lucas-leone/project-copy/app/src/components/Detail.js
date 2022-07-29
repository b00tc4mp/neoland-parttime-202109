import './x.css'
import './Update.css'
import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { retrieveList, deleteList } from "../logic"
import UpdateList from "./UpdateList"
import List from "./List"
import Context from './Context'

export default function () {
    const { setFeedback } = useContext(Context)
    const [list, setList] = useState()
    const [controls, setControls] = useState(true)
    const [deleteControl, setDeleteControl] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    const { listId } = params

    useEffect(() => {
        refreshList()
    }, [listId])

    const refreshList = () => {
        try {
            retrieveList(sessionStorage.token, listId)
                .then(list => setList(list))
                .catch((error) => setFeedback({ level: 'info', message: error.message }))

        } catch (error) {
            setFeedback({ level: 'info', message: error.message })

        }
    }
    const handleEdit = () => {
        setControls(false)
    }

    const handleDeleteControl = () => {
        setDeleteControl(!deleteControl)
    }

    const handleDeleteList = (listId) => {
        try {
            deleteList(sessionStorage.token, listId)
                .then(() => {
                    navigate(`/`)
                })
                .catch(error => setFeedback({ level: 'info', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }
//THIS MANAGE THE X BUTTON
    const handleGoBack = () => {
        navigate(`/`)
    }

    return <>
        <button className='x' onClick={handleGoBack}>x</button>
        {controls ?
            <>  <div className='Detail__contenedor'>
                {list && <List list={list} />}

                <button className='Detail_subButon' onClick={handleEdit}>Edit</button>
                <button className='Detail_subButon' onClick={handleDeleteControl}>Delete</button>
                {deleteControl && <div className='detail__delete'>
                    <p className='detail_deleteText' >Are you sure?</p>
                    <button className='detail_deleteButton' onClick={() => handleDeleteList(list.id)}>Yes</button>
                    <button className='detail_deleteButton' onClick={handleDeleteControl}>No</button>
                </div>}
            </div>
            </> :
            <UpdateList refresh={refreshList} list={list} />}

    </>

}