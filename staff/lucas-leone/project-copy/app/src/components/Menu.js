import './Menu.css'
import { useEffect } from "react";
import { retrieveAllLists } from "../logic";
import { useState } from "react";
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import Context from './Context'
import Section from "./Section";

export default function ({ refresh }) {
    const { setFeedback } = useContext(Context)
    const [lists, setLists] = useState()
    const params = useParams()
    const { username } = params

    useEffect(() => {
        refreshList()
    }, [])

    const refreshList = () => {
        try {
            retrieveAllLists(username)
                .then((lists) => setLists(lists))
                .catch((error) => setFeedback({ level: 'info', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }

    return <div>
        <h1 className='menu__title'>{username}</h1>
        <ul className="menu__contenedor">
            {lists ? lists.map(list =>
                <li>
                    <div className='menu__list'>
                        <div className='menu_listInfo'>
                            <h1>{list.name}</h1>
                            <p>{list.description}</p>
                        </div>
                        {list.sections ? list.sections.map(section => <div>
                            <Section section={section} listPrice={list.price} />
                        </div>) : <p>no sections</p>}
                        {list.price && <p className='menu__price'>${list.price}</p>}

                    </div>

                </li>) : <p>no list</p>}

        </ul>
    </div>
}