import { useState, useEffect } from "react"
import './PartItem.css'
export default function ({ content }) {
    const [title, setTitle] = useState()

    useEffect(() => {
        if (content.side === 'lead')
            setTitle('Parte delantera')
        else if (content.side === 'rear')
            setTitle('Parte trasera')
        else if (content.side === 'right')
            setTitle('Parte derecha')
        else if (content.side === 'left')
            setTitle('Parte izquierda')
    }, [])


    return <div className="partItem__card">
        <div className="partItem__content">
            <div className={`partItem partItem--${content.state}`}></div>
            <h4>{title}</h4>
        </div>
        <p className="partItem__date">Fecha de creacción: {content.newDate}</p>
    </div>
}