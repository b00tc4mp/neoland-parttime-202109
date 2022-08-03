import { useState, useEffect } from 'react'

export default function ({ content }) {
    const [state, setState] = useState()
    const [part, setPart] = useState()

    useEffect(() => {
        if (content.active === true) {
            setState('Activo')
        } else {
            setState('Desactivado')
        }
    })

    useEffect(() => {
        if (!content.parts.length) {
            setPart(0)
        } else {
            setPart(content.parts.length)
        }
    }, [])

    return <div>
        <h3>{content.lisense}</h3>
        <span>Partes: {part}</span>
        <p>{state}</p>
    </div>
}