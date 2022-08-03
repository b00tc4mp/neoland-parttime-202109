import { useState, useEffect } from 'react'

export default function ({ content }) {
    const [state, setState] = useState()

    useEffect(() => {
        if (content.active === true) {
            setState('Activo')
        } else {
            setState('Desactivado')
        }
    }, [])

    return <div>
        <h3>{content.businessId}</h3>
        <h3>{content.name}</h3>
        <p>{content.role}</p>
        <span>{state}</span>
    </div>
}