import './Feedback.css'
import { useEffect } from 'react'

export default ({ level, message, onTimeout }) => {
    useEffect(() => {
        setTimeout(onTimeout, 2000)
    }, [])

    return <div className={`Feedback Feedback--${level}`}>{message}</div>
}